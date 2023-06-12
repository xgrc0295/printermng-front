import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private service: SalesService) {}

  ngOnInit(): void {
    this.service.getMonthProfile().subscribe((res) => {
      this.monthProfileResult = res;
      this.getLabelsAndData();
    });
    this.service.getPrinterProfile().subscribe((res) => {
      this.printerProfileResult = res;
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.months,
      datasets: [
        {
          label: '2023年度销售利润',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.monthProfiles,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  data: any;
  options: any;

  printerProfileResult: any;
  monthProfileResult: any;

  months: string[] = [];
  monthProfiles: number[] = [];

  // 获取月份和利润集合
  public getLabelsAndData() {
    console.log(this.monthProfileResult);
    for (let monthProfile of this.monthProfileResult) {
      this.months.push(monthProfile.month);
      this.monthProfiles.push(monthProfile.monthProfile);
    }
    console.log(this.months);
    console.log(this.monthProfiles);
  }

  // 分页相关
  first = 0;
  rows = 5;
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
