import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Theme } from 'src/app/share/+state/theme/theme.model';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { FromThemeEditComponent } from '../../from/from-theme-edit/from-theme-edit.component';

@Component({
  selector: 'app-teacher-theme',
  templateUrl: './teacher-theme.component.html',
  styleUrls: ['./teacher-theme.component.scss']
})
export class TeacherThemeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Theme[];
  selectedData:any;
  displayedColumns: string[] =['id','name','course_id','action'];
  dataSource = new MatTableDataSource<Theme>(this.ELEMENT_DATA); 
  constructor(private service: ThemeService, private matDialog: MatDialog) { }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentTheme.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchCategory()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromThemeEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchCategory()

  }
  onRowClicked(data) {
     console.log(data);
    this.openDialog();
    this.service.changeTheme(data);
    this.fetchCategory();
}
  fetchCategory() {
    let resp=this.service.getTheme();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Theme[]);
    console.log(resp);
  }  
  // remove(id) {
  //   this.service.delete(id).subscribe(res => {
  //     this.fetchLevel();
  //   })
  // }
}
