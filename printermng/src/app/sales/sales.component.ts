import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  constructor(private service: SalesService) {}

  ngOnInit() {
    this.service.getCustomers().subscribe((res) => {
      this.customersResult = res;
    });
    this.service.getPrinters().subscribe((res) => {
      this.printersResult = res;
    });
    this.service.getEmployees().subscribe((res) => {
      this.employeeResult = res;
    });
    this.service.getPrintersSales().subscribe((res) => {
      this.printerSalesResult = res;
      this.latestResult = this.printerSalesResult.slice(-5);
    });
    this.resetSales();
  }

  // 销售表格
  salesFormGroup: FormGroup = new FormGroup({
    printerName: new FormControl(),
    empName: new FormControl(),
    customerName: new FormControl(),
    salesPrice: new FormControl(),
    quantity: new FormControl(),
    notes: new FormControl(),
    date: new FormControl(),
    profile: new FormControl(),
    warehoused: new FormControl(),
  });

  warehoused: any[] = [
    { label: '是', value: 'true' },
    { label: '否', value: 'false' },
  ];

  // 增加销售记录

  public saveSales() {
    const formValue = this.salesFormGroup.value;

    // 对表单数据进行重新封装
    const newFormValue = {
      salesId: '',
      empId: formValue.empName.empId,
      customerId: formValue.customerName.customerId,
      printerId: formValue.printerName.printerId,
      shippingDate: formValue.date,
      quantity: formValue.quantity,
      notes: formValue.notes,
      price: formValue.salesPrice,
      warehoused: formValue.warehoused,
    };
    this.service.saveSales(newFormValue).subscribe((res) => {
      this.service.getPrintersSales().subscribe((res) => {
        this.printerSalesResult = res;
        this.latestResult = this.printerSalesResult.slice(-5);
      });
      this.salesFormGroup.reset();
    });
  }

  // 销售相关

  latestResult: any;
  printerSalesResult: any;

  // 打印机产品相关
  printersResult: any;
  selectedPrinter: any;

  price: number = 0;
  salesPrice: number = 0;
  salesQuantity: number = 0;

  // 根据打印机名字获取价格
  public getPrinterInfo(printerName: string) {
    for (let printer of this.printersResult)
      if (printer.printerName == printerName) {
        this.price = printer.printerPrice;
      }
  }

  public resetSales() {
    this.salesFormGroup.reset();
  }

  // 员工信息
  employeeResult: any;
  selectedEmployee: any;

  // 顾客信息
  customersResult: any;
  selectedCustomer: any;
}
