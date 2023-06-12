import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) {}

  //获取顾客每月数量
  public getByCreateTime() {
    let url = 'http://localhost:8080/customers/CreateTime';
    return this.http.get(url, { responseType: 'json' });
  }

  //所有顾客购买力排行
  public ShowCustomersRanks() {
    let url='http://localhost:8080/customerAndSales/rankSum';
    return this.http.get(url);
    
  }

  // 获取库存数量
  public getInventory() {
    let url = 'http://localhost:8080/warehouse/getInventory';
    return this.http.get(url, { responseType: 'json' });
  }

}
