import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../Customer';
import { MenuItem, Message } from 'primeng/api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  result: any;

  //分页
  //从哪条数据开始展示
  first: number = 0;

  //每页展示几行数据
  rows: number = 8;
  

  //数据量
  totalRecords:number= 0;

  //菜单
  items: MenuItem[] = [];
  
  
  ngOnInit(): void {
    
  }


  constructor(public service: CustomerServiceService )  {}

  //展示顾客信息
  public showCustomers() {
    this.service.ShowCustomers().subscribe((res) => {
      this.result = res;
      this.totalRecords=this.result.length;
      
    });
  }

  onPageChange(event:any) {
    this.first = event.first;
    this.rows = event.rows;
}



//搜索顾客
public customerNameFormControl = new FormControl();
public addressFormControl = new FormControl();
public createTimeFormControl = new FormControl('', [Validators.required, Validators.pattern(/^(0?[1-9]|1[0-2])$/)]);
public companyNameFormControl=new FormControl();
public regionFormControll=new FormControl();
public dutyFormControll=new FormControl();
public phoneNumberFormControl = new FormControl();
public purchaseIntentionFormControl = new FormControl();

searchCustomerFormGroup: FormGroup = new FormGroup({
  customerName: this.customerNameFormControl,
  address: this.addressFormControl,
  createTime: this.createTimeFormControl,
  companyName:this.companyNameFormControl,
  region:this.regionFormControll,
  duty:this.dutyFormControll,
  purchaseIntention:this.purchaseIntentionFormControl,
  phoneNumber:this.phoneNumberFormControl
});

//清除按钮
public remove(){
  this.searchCustomerFormGroup.reset();
}

public LikeSeach(){
  this.service.likeSerch(this.searchCustomerFormGroup.value).subscribe((res)=>{
    this.result=res;
    this.totalRecords=this.result.length;
  })
}

//添加顾客
//新增图书 显示对话框

//下拉列表
groups =[
  { label: '购买', value:'购买'},
  { label: '租借', value:'租借'},
  { label: '有意向', value:'有意向' },

];

selectedGroup: any;
AddCustomerDialogIsVisible: boolean = false;


public AddcustomerNameFormControl = new FormControl('');
public AddaddressFormControl = new FormControl('');
public AddregionFormControl = new FormControl('');
public AddgenderFormControl = new FormControl('');
public AddphoneNumberFormControl = new FormControl('',[Validators.required, Validators.pattern(/^\d{11}$/)]);
public AddcustomerEmailFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]);
public AddhobbyFormControl = new FormControl('');
public AddpurchaseIntentionFormControl = new FormControl('');
public AddbankAccountFormControl = new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{10,20}$/)]);
public AddcompanyNameFormControl = new FormControl('');
public AdddutyFormControl = new FormControl('');
public AddcompanyEmailFormControl = new FormControl('',[Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]);
addCustomeFromGroup:FormGroup = new FormGroup({
  customerName: this.AddcustomerNameFormControl,
  address:this.AddaddressFormControl,
  region:this.AddregionFormControl,
  gender: this.AddgenderFormControl,
  phoneNumber: this.AddphoneNumberFormControl,
  customerEmail: this.AddcustomerEmailFormControl,
  hobby:this.AddhobbyFormControl,
  purchaseIntention:this.AddpurchaseIntentionFormControl,
  bankAccount:this.AddbankAccountFormControl,
  duty:this.AdddutyFormControl,
  companyName:this.AddcompanyNameFormControl,
  companyEmail:this.AddcompanyEmailFormControl
});
showAddCustomer() {
  this.AddCustomerDialogIsVisible = true;
}

public cancelAddCustomer(){
  this.AddCustomerDialogIsVisible = false;
  this.selectedGroup =null;
  this.addCustomeFromGroup.reset();

}
public addCustomer() {
    console.log(this.addCustomeFromGroup.value)
  this.service.addCustomer(this.addCustomeFromGroup.value).subscribe((_res) => {
    this.LikeSeach();
    this.addCustomeFromGroup.reset();
    this.AddCustomerDialogIsVisible = false;
    
  });
  this.selectedGroup=null;
  this.addCustomeFromGroup.reset();
}

//修改顾客信息
  ShowUpdateCustomerForm: boolean=false;
currentCustomer:Customer= new Customer('','','','','','','','','','','','','','','',false);
public updateCustomer(){
  this.service.updateCustomer(this.currentCustomer).subscribe((res)=>{
    
    this.LikeSeach();
    this.ShowUpdateCustomerForm = false;
  });
}


//展示更新顾客信息
public showUpdateForm(customer:Customer){
    
  //避免双向绑定，在修改顾客信息时不会修改顾客信息
  this.currentCustomer=JSON.parse(JSON.stringify(customer));

  this.ShowUpdateCustomerForm = true;

}

  //不展示顾客信息
  public cancelUpdateForm(){
    this.ShowUpdateCustomerForm = false;
  }

//提示信息
message:boolean=false;


  //展示当前顾客购买排行榜
  Ranksresult: any;

  RanksTotalRecords:number= 0;

  ShowRanksCustomerForm: boolean=false;

  RanksCustomer:Customer= new Customer('','','','','','','','','','','','','','','',false);
  
  //从哪条数据开始展示
  Ranksfirst: number = 0;

  //每页展示几行数据
  Ranksrows: number = 10;
  
  RanksOnPageChange(event:any) {
    this.first = event.Ranksfirst;
    this.rows = event.Ranksrows;
}


  public showRanksForm(customer:Customer) {
    this.RanksCustomer=JSON.parse(JSON.stringify(customer));
  
    this.ShowRanksCustomerForm = true;
    this.service.ShowRanksByName(this.RanksCustomer.customerName).subscribe((res)=>{
      this.Ranksresult=res;
    })
  }

  // //修改时间格式
  // formatDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   if (isNaN(date.getTime())) {
  //     return '';
  //   }
  //   return date.toISOString().slice(0, 10);
  // }


  
  //计算数量（尾部table）
  //脚页方法获取分组内图书数量
public calculateCustomerTotal(name:any){
  let total=0;
  if(this.result){
    for(let customer of this.result){
      if(customer.address==name){
        total++;
      }
    }
  }
  return total;
}
    //删除顾客
    ShowdeleteCustomerForm:boolean =false;

    public cancelDeleteDiolog(){
      this.ShowdeleteCustomerForm = false;
    }

    DeleteCustomer:Customer= new Customer('','','','','','','','','','','','','','','',false);
    public showDeleteDiolog(customer:Customer){    
     this.ShowdeleteCustomerForm = true;
     this.DeleteCustomer=JSON.parse(JSON.stringify(customer));
    }

    //删除顾客信息(修改delete_flag)
  public deleteCustomer(){
    this.service.deleteCustomer(this.DeleteCustomer.customerId).subscribe((ref)=>{
    this.LikeSeach();
    this.ShowdeleteCustomerForm=false;
  });
}
}


