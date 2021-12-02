import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FromCategoryEditComponent } from '../../from/from-category-edit/from-category-edit.component';
import { Category } from 'src/app/share/+state/category/category.model';
import { CategoryService } from 'src/app/share/+state/category/category.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss']
})
export class TableCategoryComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Category[];
  selectedData:any;
  displayedColumns: string[] =['id','name','action'];
  dataSource = new MatTableDataSource<Category>(this.ELEMENT_DATA);  


  constructor(private service: CategoryService, private matDialog: MatDialog) { }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentCategory.subscribe(data =>
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
    const dialogRef = this.matDialog.open(FromCategoryEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchCategory()

  }
  onRowClicked(data) {
     console.log(data);
    this.openDialog();
    this.service.changeCategory(data);
    this.fetchCategory();
}
  fetchCategory() {
    let resp=this.service.getCategory();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Category[]);
    console.log(resp);
  }  
  // remove(id) {
  //   this.service.delete(id).subscribe(res => {
  //     this.fetchLevel();
  //   })
  // }

}
