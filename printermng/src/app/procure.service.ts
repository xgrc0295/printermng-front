import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Circum } from './Circum';
import { Expand } from './Expand';
import { Printer } from './Printer';
import { Warehousing } from './Warehousing';

@Injectable({
  providedIn: 'root',
})
export class ProcureService {
  constructor(private http: HttpClient) {}

    //展示打印机数据
    public showPrinters(){
      let url="http://localhost:8080/printer/get"
      return this.http.get(url);
    } 
    //查询打印机的数据
    public searchPrinter(printer:Printer){
      let url="http://localhost:8080/printer/GET"
      return this.http.post(url,printer,{ responseType: 'json'});
    }
    
    //展示周边数据
    public showCircums(){
      let url="http://localhost:8080/circum/get"
      return this.http.get(url);
    } 
    //查询周边的数据
    public searchCircum(circum:Circum){
      let url="http://localhost:8080/circum/GET"
      return this.http.post(url,circum,{ responseType: 'json'});
    }

    //展示消耗品数据
    public showExpands(){
      let url="http://localhost:8080/expand/get"
      return this.http.get(url);
    } 
    //查询消耗品的数据
    public searchExpand(expand:Expand){
      let url="http://localhost:8080/expand/GET"
      return this.http.post(url,expand,{ responseType: 'json'});
    }

    //展示入库数据
    public showWarehousings(){
      let url="http://localhost:8080/warehouses/get"
      return this.http.get(url);
    } 
    //查询入库的数据
    public searchWarehousing(warehousing:Warehousing){
      let url="http://localhost:8080/warehouses/GET"
      return this.http.post(url,warehousing,{ responseType: 'json'});
    }
    //添加入库
      public addWarehousing(warehousing:Warehousing){
        let url="http://localhost:8080/warehouses/post";
        let options={ responseType: 'text' as 'json'};
        return this.http.post(url,warehousing,options);
      }
    //删除入库
      public deleteWarehousing(warehousingId:string,expandName:string,type:string){
        let url="http://localhost:8080/warehouses/delete/"+warehousingId+"/"+expandName+"/"+type;
        return this.http.delete(url);
      }
      //更新入库
      public updateWarehousing(warehousing:Warehousing){
        let url="http://localhost:8080/warehouses/put";
        let options={ responseType: 'text' as 'json'};
        return this.http.put(url,warehousing,options);
      }
}
