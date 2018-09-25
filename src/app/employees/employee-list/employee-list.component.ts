import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database'

import {Employee} from '../shared/employee.model'

import {EmployeeService} from'../shared/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList : Employee[];

  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
   var x = this.employeeService.getData();
   x.snapshotChanges().subscribe(item => {
     this.employeeList = [];
     item.forEach(elem => {
      var y = elem.payload.toJSON();
      y["$key"] = elem.key;
      this.employeeList.push(y as Employee);
     })
   })
  }

  onItemClick(employee: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, employee);
  }

}
