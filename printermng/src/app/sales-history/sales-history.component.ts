import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SalesService } from '../sales.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css'],
})
export class SalesHistoryComponent {
  constructor(
    private service: SalesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.service.getEmployees().subscribe((res) => {
      this.employeeResult = res;
    });
    this.service.getCustomers().subscribe((res) => {
      this.customersResult = res;
    });
    this.service.getPrinters().subscribe((res) => {
      this.printersResult = res;
    });
  }

  //搜索销售
  searchSalesResult: any;
  selectedEmployee: any;
  selectedCustomer: any;
  selectedPrinter: any;
  printersResult: any;
  customersResult: any;
  searchSalesFormGroup: FormGroup = new FormGroup({
    printerName: new FormControl(),
    customerName: new FormControl(),
    empName: new FormControl(),
    notes: new FormControl(),
  });

  public searchSales() {
    this.service
      .searchSales(this.searchSalesFormGroup.value)
      .subscribe((res) => {
        this.searchSalesResult = res;
      });
  }

  // 分页相关
  first = 0;
  rows = 5;
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  // 出库相关
  employeeResult: any;
  warehousePrinterId: number = 0;
  warehouseEmpId: number = 0;
  warehouseInventory: number = 0;
  warehouseSalesId: number = 0;

  warehouseOutIsVisible = false;
  public warehouseOut(sales: any) {
    this.warehousePrinterId = this.getPrinterByName(
      sales.printerName,
      this.printersResult
    ).printerId;
    this.warehouseInventory = sales.quantity;
    this.warehouseSalesId = sales.salesId;
    this.warehouseOutIsVisible = true;
  }

  public warehouseOutConfrim() {
    const warehouseJson = {
      printerId: this.warehousePrinterId,
      empId: this.selectedEmployee.empId,
      inventory: this.warehouseInventory,
      warehouseOutDate: new Date(),
    };
    this.service.warehouseOut(warehouseJson).subscribe((res) => {
      this.service.setWarehoused(this.warehouseSalesId).subscribe((res) => {
        this.searchSales();
      });
    });
    this.warehouseOutIsVisible = false;
  }

  public warehouseCancel() {
    this.warehouseOutIsVisible = false;
    console.log(this.selectedEmployee);
    this.selectedEmployee = null;
  }

  // 销售信息
  salesId: number = 0;
  printerName: string = '';
  empName: string = '';
  customerName: string = '';
  notes: string = '';
  shippingDate: Date = new Date();
  profile: number = 0;
  warehoused = false;
  printerPrice: number = 0;
  price: number = 0;
  quantity: number = 0;

  // 是否已出库
  isWarehoused: any[] = [
    { label: '是', value: true },
    { label: '否', value: false },
  ];

  // 修改相关
  updateSalesIsVisible = false;
  public updateSales(sales: any) {
    this.salesId = sales.salesId;
    this.printerPrice = sales.printerPrice;
    this.price = sales.price;
    this.quantity = sales.quantity;
    // 将字符串类型的时间转换为时间类型的时间
    const tempDate = new Date(sales.shippingDate);
    this.shippingDate = tempDate;
    this.notes = sales.notes;
    this.profile = sales.profile;
    this.warehoused = sales.warehoused;
    this.selectedEmployee = this.getEmpByName(
      sales.empName,
      this.employeeResult
    );
    this.selectedPrinter = this.getPrinterByName(
      sales.printerName,
      this.printersResult
    );
    this.selectedCustomer = this.getCustomerByName(
      sales.customerName,
      this.customersResult
    );
    this.updateSalesIsVisible = true;
  }
  public updateSalesCancel() {
    this.updateSalesIsVisible = false;
  }

  public updateSalesConfirm() {
    const salesJson = {
      salesId: this.salesId,
      printerId: this.selectedPrinter.printerId,
      empId: this.selectedEmployee.empId,
      customerId: this.selectedCustomer.customerId,
      price: this.price,
      quantity: this.quantity,
      notes: this.notes,
      shippingDate: this.shippingDate,
      warehoused: this.warehoused,
    };
    console.log(salesJson);
    this.service.updateSales(salesJson).subscribe((res) => {
      this.searchSales();
    });
    this.updateSalesIsVisible = false;
  }

  // 根据名字获取对象
  public getPrinterByName(printerName: string, items: any) {
    if (items) {
      for (let item of items) {
        if (printerName == item.printerName) {
          return item;
        }
      }
    } else {
      return null;
    }
  }

  public getEmpByName(empName: string, items: any) {
    if (items) {
      for (let item of items) {
        if (empName == item.empName) {
          return item;
        }
      }
    } else {
      return null;
    }
  }

  public getCustomerByName(customerName: string, items: any) {
    if (items) {
      for (let item of items) {
        if (customerName == item.customerName) {
          return item;
        }
      }
    } else {
      return null;
    }
  }

  // 删除销售信息

  confirm(event: Event, salesId: number) {
    const targetElement = event.target as HTMLElement;
    this.confirmationService.confirm({
      target: targetElement,
      message: '你确定要删除此销售数据吗？',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: '确认',
      rejectLabel: '取消',
      accept: () => {
        this.service.deleteSales(salesId).subscribe(() => {
          this.searchSales();
        });
        this.messageService.add({
          severity: 'info',
          summary: '确认',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: '取消',
          detail: 'You have rejected',
        });
      },
    });
  }

  public resetSearch() {
    this.searchSalesFormGroup.reset();
  }
}
