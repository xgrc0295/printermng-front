import { Component, OnInit } from '@angular/core';
import { FaultService } from '../fault.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Fault } from '../Fault';
import { UpdateService } from '../update.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
http:any;
  constructor(private service: UpdateService) { }
  result: any;
  //输入框
  value: any;
  fault:Fault=new Fault('','','','','','','','','','');
  currentFault:Fault=new Fault('','','','','','','','','','');
  

//用于更新窗口
showUpdateFaultForm:boolean=false;
  ngOnInit(): void {
    this.showFault();
  }
  

  //展示故障信息
  public showFault() {
    this.service.showFault().subscribe((res: any) => {
      console.log(res);
      this.result = res;
      this.totalRecords=this.result.length;
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
    // 新增故障
    public addFault() {
  
      // 获取表单值
      const formValue = this.addFaultFromGroup.value;
  
      // 创建新的表单值，只包含 selectedGroup 的 groupName 属性
      const newFormValue = {
        faultId: '',
        faultName: formValue.faultName,
        faultDescrip:formValue.faultDescrip,
        faultReason:formValue.faultReason,
        faultSolve:formValue.faultSolve,
         empId:formValue.empId,
        empName:formValue.empName,
        customerName:formValue.customerName,
        customerAddress:formValue.customerAddress,
        orderNumber:formValue.orderNumber
      };
  
      this.service.insertFault(newFormValue).subscribe((res) => {
        this.showFault();
        this.addFaultFromGroup.reset();
        this.addFaultDialogIsVisible = false;
      });
    }
    
      
  






    addFaultDialogIsVisible: boolean = false;

    selectedGroup: any;
  
    
    addFaultFromGroup: FormGroup = new FormGroup({
      faultName: new FormControl(),
      faultDescrip: new FormControl(),
      faultReason: new FormControl(),
      faultSolve: new FormControl(),
      empId: new FormControl(),
      empName: new FormControl(),
      customerName: new FormControl(),
      customerAddress: new FormControl(),
      orderNumber: new FormControl(),
     
      
    });
    
    public showAddFaultDialog() {
      this.addFaultDialogIsVisible = true;
      this.showUpdateFaultForm=false;
    
    }
    
    public cancelAddFault() {
      this.addFaultDialogIsVisible = false;
    }
    
   
    
    
    
     //更新故障
    public updateFault(){
      this.service.updateFault(this.currentFault).subscribe((res:any)=>{
         this.showFault();
         return ;
      });
      this.showUpdateFaultForm=false;
      alert('更新成功');
       
      
    }
      
      //打开更新故障窗口
    public showUpdateForm(fault:Fault){
      this.showUpdateFaultForm=true;
      this.currentFault=JSON.parse(JSON.stringify(fault));
      this.addFaultDialogIsVisible = false; 
      
    }
      //关闭更新故障窗口
      public cancelUpdateFaultForm(){
        this.showUpdateFaultForm=false;
      }
    
     
  
    

}


    



