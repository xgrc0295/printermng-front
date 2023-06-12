import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data1: any;
  options: any;
  data2: any;
  options2: any;
  basicData: any;
  basicOptions: any;
  data4: any;
  options4: any;
  labals4: any;
  labals5: any;
  Ranksresults: any;
  Ranksresults1: any;
  
  inventoryResult: any;
  inventoryResult1: any;

  constructor(public service: HomeServiceService )  {}


  ngOnInit() {

      this.getTimeAndCustomers();
      this.showCustomersRanks();
      this.service.getInventory().subscribe((res) => {
        this.inventoryResult = res;
        this.inventoryResult1=this.inventoryResult.slice(0,5);
        this.getprinterNameAndinventory();
      });

    //饼状图
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data1 = {
      labels: this.companyName,
      datasets: [
        {
          data: this.totalPrice,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
    //销售柱状图
    const documentStyle2 = getComputedStyle(document.documentElement);
    const textColor2 = documentStyle2.getPropertyValue('--text-color');
    const textColorSecondary2 = documentStyle2.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder2 = documentStyle2.getPropertyValue('--surface-border');
    this.data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '库存',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: '销售',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
    this.options2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor2,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary2,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder2,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary2,
          },
          grid: {
            color: surfaceBorder2,
            drawBorder: false,
          },
        },
      },
    };

    //柱状图
    const documentStyle3 = getComputedStyle(document.documentElement);
    const textColor3 = documentStyle3.getPropertyValue('--text-color');
    const textColorSecondary3 = documentStyle3.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder3 = documentStyle3.getPropertyValue('--surface-border');

    this.basicData = {
      labels: this.printerName,
      datasets: [
        {
          label: '库存量',
          data: this.inventory,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor3,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary3,
          },
          grid: {
            color: surfaceBorder3,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary3,
          },
          grid: {
            color: surfaceBorder3,
            drawBorder: false,
          },
        },
      },
    };
    //曲线图
    const documentStyle4 = getComputedStyle(document.documentElement);
    const textColor4 = documentStyle4.getPropertyValue('--text-color');
    const textColorSecondary4 = documentStyle4.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder4 = documentStyle4.getPropertyValue('--surface-border');
    
    this.data4 = {
      labels: this.months,
      datasets: [
        {
          label: '客户数',
          data: this.customerCount,
          fill: false,
          borderColor: documentStyle4.getPropertyValue('--purple-500'),
          tension: 0.4,
        },
      ],
    };

    this.options4 = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor4,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary4,
          },
          grid: {
            color: surfaceBorder4,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary4,
          },
          grid: {
            color: surfaceBorder4,
            drawBorder: false,
          },
        },
      },
    };
  }

  //获取顾客和时间
  public getTimeAndCustomers(){
    this.labals4 = { month: "", customerCount: 0 };
      this.service.getByCreateTime().subscribe((res)=>{
          this.labals4=res;
          this.labals5=this.labals4.slice(0,5);
          
          this.getMonthAndCustomerCount();
      })
  }
  months: string[] = [];
  customerCount: number[] = [];

  
  public getMonthAndCustomerCount() {
    for (let GetCustomersByTime of this.labals5) {
      this.months.push(GetCustomersByTime.month)
      this.customerCount.push(GetCustomersByTime.customerCount);
    }


  }

  public showCustomersRanks() {
    this.service.ShowCustomersRanks().subscribe((res) => {
      this.Ranksresults = res;
      this.Ranksresults1=this.Ranksresults.slice(0,5);
      this.getcompanyNameAndtotalPrice();
      
    });
  }

  companyName: string[] = [];
  totalPrice: number[] = [];

  
  public getcompanyNameAndtotalPrice() {
   
    for (let customerAndSales of this.Ranksresults1) {
      this.companyName.push(customerAndSales.companyName)
      this.totalPrice.push(customerAndSales.totalPrice);
    }

  }

  printerName: string[] = [];
  inventory: number[] = [];

  
  public getprinterNameAndinventory() {
   
    for (let inventory of this.inventoryResult1) {
      this.printerName.push(inventory.printerName)
      this.inventory.push(inventory.inventory);
    }
    console.log(this.printerName);
    console.log(this.inventory);
  }
}
