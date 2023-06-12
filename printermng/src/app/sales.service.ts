import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}

  // 销售表相关业务

  // 获取销售表
  public getPrintersSales() {
    let url = 'http://localhost:8080/printerSales';
    return this.http.get(url, { responseType: 'json' });
  }

  // 搜索销售表
  public searchSales(sales: any) {
    let url = 'http://localhost:8080/printerSales/searchSales';
    return this.http.post(url, sales, { responseType: 'json' });
  }

  // 删除销售表
  public deleteSales(salesId: number) {
    let url = 'http://localhost:8080/printerSales/' + salesId;
    return this.http.delete(url);
  }

  // 添加销售信息
  public saveSales(sales: any) {
    let url = 'http://localhost:8080/printerSales';
    return this.http.put(url, sales);
  }

  // 更新销售表
  public updateSales(sales: any) {
    let url = 'http://localhost:8080/printerSales';
    return this.http.post(url, sales);
  }

  // 设置已出库核销
  public setWarehoused(salesId: number) {
    let url = 'http://localhost:8080/printerSales/setWarehoused/' + salesId;
    return this.http.delete(url);
  }

  // 打印机表相关业务

  // 获取打印机表
  public getPrinters() {
    let url = 'http://localhost:8080/printer';
    return this.http.get(url, { responseType: 'json' });
  }

  // 员工表相关业务

  // 获取员工表

  public getEmployees() {
    let url = 'http://localhost:8080/employee';
    return this.http.get(url, { responseType: 'json' });
  }

  // 顾客表相关业务

  // 获取顾客表

  public getCustomers() {
    let url = 'http://localhost:8080/customers/getAll';
    return this.http.get(url, { responseType: 'json' });
  }

  // 库存相关业务

  // 获取库存表
  public getWarehouses() {
    let url = 'http://localhost:8080/warehouse';
    return this.http.get(url, { responseType: 'json' });
  }

  // 获取库存数量
  public getInventory() {
    let url = 'http://localhost:8080/warehouse/getInventory';
    return this.http.get(url, { responseType: 'json' });
  }

  // 模糊查询库存数量
  public getInventoryByName(printerName: string) {
    let url =
      'http://localhost:8080/warehouse/getInventoryByName/' + { printerName };
    return this.http.get(url, { responseType: 'json' });
  }

  // 销售核销出库
  public warehouseOut(warehouse: any) {
    let url = 'http://localhost:8080/warehouse/warehouseOut';
    return this.http.put(url, warehouse);
  }

  // 利润相关业务

  // 获取月度利润
  public getMonthProfile() {
    let url = 'http://localhost:8080/profiles/getMonthProfile';
    return this.http.get(url, { responseType: 'json' });
  }

  // 获取产品利润
  public getPrinterProfile() {
    let url = 'http://localhost:8080/profiles/getPrinterProfile';
    return this.http.get(url, { responseType: 'json' });
  }
}
