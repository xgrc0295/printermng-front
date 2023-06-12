import { Component, OnInit } from '@angular/core';
import { FaultService } from '../fault.service';
import { Fault } from '../Fault';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-fault',
  templateUrl: './fault.component.html',
  styleUrls: ['./fault.component.css']
})
export class FaultComponent implements OnInit{
  constructor(private service: FaultService) { }

  ngOnInit(): void {
    this.showFault();
  };

  result: any;
  //输入框
  value: any;
  //展示故障信息
  public showFault() {
    this.service.showFault().subscribe((res: any) => {
      console.log(res);
      this.result = res;
    });
  }

  //从哪条数据开始展示
  first: number = 0;
  //每一页展示的数量
  rows: number = 10;
  //数据量
  totalRecords: number = 0;

  //分页
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  

  //搜索故障信息
  selectFaultResult: any;

    selectFaultFormGroup: FormGroup = new FormGroup({
    faultName: new FormControl(),
    faultDescrip: new FormControl(),
    empName: new FormControl(),
    customerName: new FormControl(),
  });
    public selectFault() {
        this.service
          .selectFault(this.selectFaultFormGroup.value)
          .subscribe((res) => {
            this.selectFaultResult = res;
            
          });
      }
}
