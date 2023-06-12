import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerAndSalesService {

  constructor(public http:HttpClient) { 

  }
  

  //所有顾客购买力排行
  public ShowAllRanks() {
    let url='http://localhost:8080/customerAndSales/ranks';
    return this.http.get(url);
    
  }

  //所有顾客购买力排行
  public ShowCustomersRanks() {
    let url='http://localhost:8080/customerAndSales/rankSum';
    return this.http.get(url);
    
  }
}
