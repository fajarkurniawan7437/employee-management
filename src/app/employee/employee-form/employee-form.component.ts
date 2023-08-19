import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../core/core.service";
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  employeeFrom: FormGroup

  status: string[] = [
    'Active',
    'InActive'
  ]

  group: string[] = [
    'Full Stack Developer',
    'Back-End Developer',
    'Front-End Developer',
    'QA',
    'Design',
    'Software Engineer',
    'IT Support',
    'Data Center',
    'Data Scientist',
    'Database Administrator'
  ]
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _empService: EmployeeService,
    private readonly _dialogRef: MatDialogRef<EmployeeListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _coreService: CoreService,
  ) {
    this.employeeFrom = this._fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  updateEmployee() {
    this._empService.updateEmployee(this.data.id, this.employeeFrom.value).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Employee update success', 'Close');
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
        this._coreService.openSnackBar('Employee update failed', 'Close');
      }
    });
  }

  addEmployee() {
    this._empService.addEmployee(this.employeeFrom.value).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Employee add success', 'Close');
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
        this._coreService.openSnackBar('Employee add failed', 'Close');
      }
    });
  }

  onFormSubmit() {
    if (this.employeeFrom.valid) {
      const birtDateValue =  this.employeeFrom.get('birthDate')?.value
      const currentDate = new Date()

      if(birtDateValue > currentDate){
        this._coreService.openSnackBar('BirthDate cannot be in the future', 'Close');
        return;
      }
      if (this.data) {
        // Konfirmasi SweetAlert2 untuk pembaruan
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to update this employee.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, update it!',
          cancelButtonText: 'No, cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateEmployee();
          }
        });
      } else {
        // Konfirmasi SweetAlert2 untuk penambahan
        Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to add a new employee.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, add it!',
          cancelButtonText: 'No, cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            this.addEmployee();
          }
        });
      }
    }else {
      // Tampilkan pesan kesalahan jika form tidak valid
      this._coreService.openSnackBar('Please fill in all required fields and correct any errors', 'Close');
    }
  }


  ngOnInit() {
    this.employeeFrom.patchValue(this.data)
  }
}
