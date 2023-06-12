import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fault } from './Fault';

@Injectable({
  providedIn: 'root'
})
export class FaultService {

  constructor(private http:HttpClient) { }

  //展示维修问题界面
  public showFault(){
    let url = 'http://localhost:8080/fault'
    return this.http.get(url);
  }
  //查询故障信息
  public selectFault(fault:any){
    let url = 'http://localhost:8080/fault/selectFault';
    return this.http.post(url,fault,{ responseType :'json'});
  }
   
  //添加故障
  public insertFault(fault: Fault) {
    let url = 'http://localhost:8080/fault';
    let options = { responseType: 'text' as 'json' };
    return this.http.post(url, fault, options);
  }
  
  

}

