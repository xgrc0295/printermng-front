import { Component, OnInit } from '@angular/core';
import { CustomerAndSalesService } from '../customer-and-sales.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit{
  Ranksresult: any;




    //从哪条数据开始展示
    first: number = 0;

    //每页展示几行数据
    rows: number = 5;
  //从哪条数据开始展示
  Ranksfirst: number = 0;

  //每页展示几行数据
  Ranksrows: number = 10;
  ngOnInit(): void {
    this.showRanks();
    this.showCustomersRanks();
  }
  constructor(public service: CustomerAndSalesService) {}

  //展示顾客信息
  public showRanks() {
    this.service.ShowAllRanks().subscribe((res) => {
      this.Ranksresult = res;
      
    });
  }

  RanksOnPageChange(event:any) {
    this.first = event.Ranksfirst;
    this.rows = event.Ranksrows;
}

Ranksresults: any;





 //从哪条数据开始展示
 firsts: number = 0;

 //每页展示几行数据
 rowss: number = 5;
//从哪条数据开始展示
Ranksfirsts: number = 0;
//每页展示几行数据
Ranksrowss: number = 10;


 //展示顾客信息
 public showCustomersRanks() {
  this.service.ShowCustomersRanks().subscribe((res) => {
    this.Ranksresults = res;

    
  });
}

RanksOnPageChanges(event:any) {
  this.firsts = event.Ranksfirsts;
  this.rowss = event.Ranksrowss;
}
}
