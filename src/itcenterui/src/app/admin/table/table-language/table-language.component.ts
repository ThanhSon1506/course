import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from 'src/app/share/+state/language/language.model';
import { LanguageService } from 'src/app/share/+state/language/language.service';
import { FromLanguageEditComponent } from '../../from/from-language-edit/from-language-edit.component';

@Component({
  selector: 'app-table-language',
  templateUrl: './table-language.component.html',
  styleUrls: ['./table-language.component.scss']
})
export class TableLanguageComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Language[];
  selectedData:any;
  displayedColumns: string[] =['id','name','action'];
  dataSource = new MatTableDataSource<Language>(this.ELEMENT_DATA);  


  constructor(private service: LanguageService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentLanguage.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchUsers()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromLanguageEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchUsers()

  }
  onRowClicked(data) {
     console.log(data);
    this.openDialog();
    this.service.changeLanguage(data);
    this.fetchUsers();
}
  fetchUsers() {
    let resp=this.service.getLanguage();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Language[]);
    console.log(resp);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchUsers();
    })
  }


  


}
