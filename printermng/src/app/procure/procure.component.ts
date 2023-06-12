import { Component } from '@angular/core';
import { ProcureService } from '../procure.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Warehousing } from '../Warehousing';

@Component({
  selector: 'app-procure',
  templateUrl: './procure.component.html',
  styleUrls: ['./procure.component.css']
})
export class ProcureComponent {
  constructor(private service: ProcureService) {}
  ngOnInit(): void {
    this.showPrinters();
    this.showExpands();
    this.showCircums();
    this.showWarehousings();
  }
  // 界面加载
  warehousings=[
    {type:'打印机'},
    {type:'周边'},
    {type:'消耗品'}
  ];


  //是否展示界面
  Warehousing:Boolean=false;
  Printer:Boolean=false;
  Circum:Boolean=false;
  Expand:Boolean=false;

  // 请求后的返回值
  result: any;
  result2: any;
  result3: any;
  result4:any;



  //数据量
  totalRecords : number=0;

  //从哪条数据开始展示
  first: number = 0;

  //每一页展示的数量
  rows: number = 10;

  selectedWarehousing: any;

  //页码
    onPageChange(event : any) {
      this.first = event.first;
      this.rows = event.rows;
    }


    public calculateWarehousingTotal(type: string) {
      let total = 0;
      if (this.result) {
        for (let warehousing of this.result) {
          if (warehousing.type == type) {
            total++;
          }
        }
      }
      return total;
    }


  //展示数据
  public showWarehousings(){
    this.service.showWarehousings().subscribe((res)=>{
      this.Warehousing=true;
      this.Printer=false;
      this.Circum=false;
      this.Expand=false;
      this.result=res;
      this.totalRecords=this.result.length;
      console.log(this.result);
    });
  }
  
  public showPrinters(){
    this.service.showPrinters().subscribe((res)=>{
      this.Warehousing=false;
      this.Printer=true;
      this.Circum=false;
      this.Expand=false;
      this.result2=res;
      console.log(this.result2);
    });
  }

  public showCircums(){
    this.service.showCircums().subscribe((res)=>{
      this.Warehousing=false;
      this.Printer=false;
      this.Circum=true;
      this.Expand=false;
      this.result3=res;
      console.log(this.result3);
    });
  }

  public showExpands(){
    this.service.showExpands().subscribe((res)=>{
      this.Warehousing=false;
      this.Printer=false;
      this.Circum=false;
      this.Expand=true;
      this.result4=res;
      console.log(this.result4);
    });
  }



  //新增入库数据
  addWarehousingDialogIsVisible:boolean = false;
  public showAddWarehousingDialog(){
    this.addWarehousingDialogIsVisible=true;
  }
  public cancelAddWarehousing(){
    this.addWarehousingDialogIsVisible=false;
  }

  addWarehousingFrom:FormGroup=new FormGroup({
    expandName:new FormControl(),
    price:new FormControl(),
    type:new FormControl(),
    channel: new FormControl(),
    channelWay:new FormControl(),
    responsiblePerson:new FormControl(),
    buyer:new FormControl(),
    channelQuantity:new FormControl(),
    warehousingQuantity:new FormControl(),
    returnQuantity:new FormControl(),
  })
  
  public addWarehousing(){
    // 获取表单值
   const formValue = this.addWarehousingFrom.value;

   // 创建新的表单值，只包含 selectedGroup 的 groupName 属性
   const newFormValue = {
    warehousingId: "",
    expandName: formValue.expandName,
    price: formValue.price,
    type: formValue.type.type,
    channel: formValue.channel,
    channelWay: formValue.channelWay,
    responsiblePerson: formValue.responsiblePerson,
    buyer:formValue.buyer,
    channelQuantity:formValue.channelQuantity,
    warehousingQuantity:formValue.warehousingQuantity,
    returnQuantity:formValue.returnQuantity,
    oldName:'null',
    price1:'null',
   };
    this.service.addWarehousing(newFormValue).subscribe((res)=>{
      this.showWarehousings();
      this.addWarehousingFrom.reset();
      this.addWarehousingDialogIsVisible=false;
    });
  }

   
 
    

  //搜索数据
  public searchWarehousing(){
    this.service.searchWarehousing(this.searchWarehousingFormGroup.value).subscribe((res)=>{
      console.log(this.searchWarehousingFormGroup.value);
      this.result=res;
      console.log(res);
      this.Warehousing=true;
    })
  }
  
  searchWarehousingFormGroup: FormGroup=new FormGroup({
    expandName:new FormControl(),
    price:new FormControl(),
    price1:new FormControl(),
    type:new FormControl(),
    channel: new FormControl(),
    channelWay:new FormControl(),
    responsiblePerson:new FormControl(),
    buyer:new FormControl(),
    channelQuantity:new FormControl(),
  });

  showSearchCircumForm:Boolean=false;
  public searchCircum(){
    this.service.searchCircum(this.searchCircumFormGroup.value).subscribe((res)=>{
      this.result3=res;
      console.log(res);
      this.Circum=true;
    })
  }
  
  searchCircumFormGroup: FormGroup=new FormGroup({
    circumName:new FormControl(),
    price:new FormControl(),
    price1:new FormControl(),
  });

  public searchExpand(){
    this.service.searchExpand(this.searchExpandFormGroup.value).subscribe((res)=>{
      this.result4=res;
      console.log(res);
      this.Expand=true;
    })
  }
  
  searchExpandFormGroup: FormGroup=new FormGroup({
    expandName:new FormControl(),
  });

  public searchPrinter(){
    this.service.searchPrinter(this.searchPrinterFormGroup.value).subscribe((res)=>{
      this.result2=res;
      console.log(res);
      this.Printer=true
    })
  }
  
  searchPrinterFormGroup: FormGroup=new FormGroup({
    printerName:new FormControl(),
    price:new FormControl(),
    price1:new FormControl(),
  });


  //删除入库信息
  dID:any;
  dName:any;
  dType:any;
  deleteWarehousingDialogIsVisible:boolean = false;
  public showDeleteWarehousingDialog(warehousingId: string,expandName: string,type:string){
    this.deleteWarehousingDialogIsVisible=true;
    this.dID=warehousingId;
    this.dName=expandName;
    this.dType=type;

  }
  public cancelDeleteWarehousing(){
    this.deleteWarehousingDialogIsVisible=false;
    
  }

  public deleteWarehousing(){
    this.service.deleteWarehousing(this.dID,this.dName,this.dType).subscribe((res)=>{
      this.showWarehousings();
      this.deleteWarehousingDialogIsVisible=false;
    });
  }

  //更新入库信息
  wId:any;
  wType:any;
  oName:any;
  new:Warehousing=new Warehousing('','','','','','','','','','','','','');
  updateWarehousingDialogIsVisible:boolean = false;
  public showUpdateWarehousingDialog(warehousingId:string,expandName:string,Type:string,warehousing:Warehousing){
    this.updateWarehousingDialogIsVisible=true;
    this.wId=warehousingId;
    this.wType=Type;
    this.oName=expandName;
    this.new=warehousing;
}
  public cancelUpdateWarehousing(){
    this.updateWarehousingDialogIsVisible=false;
  }

  updateWarehousingFrom:FormGroup=new FormGroup({
    expandName:new FormControl(),
    price:new FormControl(),
    channel: new FormControl(),
    channelWay:new FormControl(),
    responsiblePerson:new FormControl(),
    buyer:new FormControl(),
    channelQuantity:new FormControl(),
    warehousingQuantity:new FormControl(),
    returnQuantity:new FormControl(),
  })
  
  public updateWarehousing(){
    // 获取表单值
   const formValue = this.updateWarehousingFrom.value;

   // 创建新的表单值，只包含 selectedGroup 的 groupName 属性
   const newFormValue = {
    warehousingId: this.wId,
    expandName: formValue.expandName,
    price: formValue.price,
    type: this.wType,
    channel: formValue.channel,
    channelWay: formValue.channelWay,
    responsiblePerson: formValue.responsiblePerson,
    buyer:formValue.buyer,
    channelQuantity:formValue.channelQuantity,
    warehousingQuantity:formValue.warehousingQuantity,
    returnQuantity:formValue.returnQuantity,
    oldName:this.oName,
    price1:'null',
   };
    this.service.updateWarehousing(newFormValue).subscribe((res)=>{
      this.showWarehousings();
      console.log(newFormValue);
      this.updateWarehousingFrom.reset();
      this.updateWarehousingDialogIsVisible=false;
    });
  }
}
