import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './Customer';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(public http:HttpClient) { 

  }
  //展示顾客信息
  public ShowCustomers() {
    let url='http://localhost:8080/customers';
    return this.
    http.get(url);
    
  }

  //添加顾客

  public addCustomer(customer:Customer){
    let url='http://localhost:8080/customers';
    let options = { responseType: 'text' as 'json' }; //把返回值变成json对象
    return this.http.post(url,customer,options);
  }

  


   // 删除顾客(修改)
   public deleteCustomer(customerId: string) {
    let url = 'http://localhost:8080/customers/' + customerId;
    let options = { responseType: 'text' as 'json' };
    return this.http.put(url,customerId,options);
  }


  //模糊查询
  public likeSerch(customer:Customer){
    let url='http://localhost:8080/customers/like';
    if(customer.customerName==null ){
      customer.customerName=""
    }
    if(customer.address==null ){
      customer.address=""
    }
    if(customer.createTime==null ){
      customer.createTime=""
    }
    if(customer.companyName==null){
      customer.companyName=""
    }
    if(customer.region==null){
      customer.region=""
    }
    if(customer.duty==null){
      customer.duty=""
    }
    if(customer.phoneNumber==null){
      customer.phoneNumber=""
    }
    if(customer.purchaseIntention==null){
      customer.purchaseIntention=""
    }
    
    return this.http.post(url, customer, { responseType: 'text' })
    .pipe(
      map(response => JSON.parse(response))
    );
  }


  public updateCustomer(customer:Customer){
    let url='http://localhost:8080/customers';
    let options = { responseType: 'text' as 'json' }; //把返回值变成json对象
    return this.http.put(url,customer,options);
  }

  //顾客单体排行榜
  public ShowRanksByName(customerName:string) {
    let url='http://localhost:8080/customerAndSales/'+ customerName;;
    return this.http.put(url, customerName, { responseType: 'text' })
    .pipe(
      map(response => JSON.parse(response))
    );
  }
}
