import {Component, ViewChild} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../core/core.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {Router} from "@angular/router";
import {Employee} from "../model/employee.model";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  templateUrl:'./employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  displayedColumns: string[] = [
    'id',
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group',
    'description',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dummyEmployees: Employee[] = [];

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _empService: EmployeeService,
    private readonly _coreService: CoreService,
    private  readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmployeeFormComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getEmployeeList()
        }
      }
    })
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.value) {
        this._empService.deleteEmployee(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Employee deleted!', 'done')
            this.getEmployeeList()
          },
          error: console.log
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Canceled', 'The employee was not deleted', 'info');
      }
    });
  }


  editEmployee(data: any){
    const dialogRef = this._dialog.open(EmployeeFormComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getEmployeeList()
        }
      }
    })
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
