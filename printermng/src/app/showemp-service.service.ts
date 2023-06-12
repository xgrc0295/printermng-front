import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emp } from './Emp';

@Injectable({
  providedIn: 'root'
})
export class ShowempServiceService {

  constructor(private http:HttpClient) { }

  //展示员工表
  public showEmp(){
    let url = 'http://localhost:8080/employee'
    return this.http.get(url);
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
