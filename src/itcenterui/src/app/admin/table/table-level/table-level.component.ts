import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Level } from 'src/app/share/+state/level/level.model';
import { LevelService } from 'src/app/share/+state/level/level.service';
import { FromLevelEditComponent } from '../../from/from-level-edit/from-level-edit.component';

@Component({
  selector: 'app-table-level',
  templateUrl: './table-level.component.html',
  styleUrls: ['./table-level.component.scss']
})
export class TableLevelComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Level[];
  selectedData:any;
  displayedColumns: string[] =['id','name','action'];
  dataSource = new MatTableDataSource<Level>(this.ELEMENT_DATA);  


  constructor(private service: LevelService, private matDialog: MatDialog) { }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentLevel.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchLevel()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromLevelEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchLevel()

  }
  onRowClicked(data) {
     console.log(data);
    this.openDialog();
    this.service.changeLevel(data);
    this.fetchLevel();
}
  fetchLevel() {
    let resp=this.service.getLevel();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Level[]);
    console.log(resp);
  }  
  // remove(id) {
  //   this.service.delete(id).subscribe(res => {
  //     this.fetchLevel();
  //   })
  // }
 

}
