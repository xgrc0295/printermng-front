import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emp } from './Emp';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  constructor(private http:HttpClient) { }

  //展示员工表
  public showEmp(){
    let url = 'http://localhost:8080/employee'
    return this.http.get(url);
  }

  //添加员工
  public addEmp(emp: Emp) {
    console.log(emp);
    let url = 'http://localhost:8080/employee';
    let options = { responseType: 'text' as 'json' };
    return this.http.post(url, emp, options);
  }

  //查询员工
  public searchEmployee(emp : Emp){
    let url='http://localhost:8080/employee/searchEmployee'
    return this.http.post(url,emp,{ responseType:'json' });
  }

  // 更新员工
  public updateEmp(emp: Emp) {
    let url = 'http://localhost:8080/employee/update';
    let options = { responseType: 'text' as 'json' };
    return this.http.put(url, emp, options);
  }
  //删除员工
  public deleteEmp(empId:string){
    let url = 'http://localhost:8080/employee/'+empId;
    let options = { responseType: 'text' as 'json' };
    return this.http.put(url,empId,options);
  }
}