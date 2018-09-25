import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {EmployeeService} from'../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {

  }

  onSubmit(form : NgForm) {
    if(form.value.$key === undefined) {
      this.employeeService.addEmployee(form.value);
    } else {
      this.employeeService.updateEmployee(form.value);
    }
    this.resetForm(form);
  }

  onDeleteEmployee(key : any) {
    this.employeeService.deleteEmployee(key.model);
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form) {
      form.reset();
    } else {
      this.employeeService.selectedEmployee = {
        $key: undefined,
        name: '',
        position: '',
        office: '',
        salary: 0,
      }
    }

  }

}
