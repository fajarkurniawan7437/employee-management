import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./model/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private readonly _http: HttpClient,
  ) { }
  addEmployee(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/employee', data)
  }

  getEmployeeById(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/employee/${id}`);
  }

  getEmployeeList(): Observable<any>{
    return this._http.get('http://localhost:3000/employee')
  }

  deleteEmployee(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/employee/${id}`)
  }

  updateEmployee(id: number, data: any): Observable<any>{
    return this._http.put(`http://localhost:3000/employee/${id}`, data)
  }

}
