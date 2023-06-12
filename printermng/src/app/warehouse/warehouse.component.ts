import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit {
  constructor(private service: SalesService) {}

  ngOnInit(): void {
    this.service.getWarehouses().subscribe((res) => {
      this.warehouseResult = res;
    });
    this.service.getInventory().subscribe((res) => {
      this.inventoryResult = res;
    });
  }
  warehouseResult: any;
  inventoryResult: any;

  // 分页相关
  first = 0;
  rows = 5;
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  printerName: string = '';

  public getInventoryByName() {
    this.service.getInventoryByName(this.printerName).subscribe((res) => {
      this.inventoryResult = res;
    });
  }
}
