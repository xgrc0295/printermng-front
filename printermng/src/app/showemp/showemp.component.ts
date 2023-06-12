import { Component, OnInit } from '@angular/core';
import { ShowempServiceService } from '../showemp-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Emp } from '../Emp';

@Component({
  selector: 'app-showemp',
  templateUrl: './showemp.component.html',
  styleUrls: ['./showemp.component.css']
})
export class ShowempComponent implements OnInit{
  constructor(private service: ShowempServiceService) { }


    value: string | undefined;
  

  ngOnInit(): void {
    this.showEmp();
  };

  result: any;

  //展示员工信息
  public showEmp() {
    this.service.showEmp().subscribe((res) => {
      console.log(res);
      this.result = res;
      this.totalRecords = this.result.length;
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

  //获取分组内员工数量
  public calculateCustomerTotal(deptName: string) {
    let total = 0;
    if (this.result) {
      for (let emp of this.result) {
        if (emp.deptName == deptName) {
          total++;
        }
      }
    }
    return total;
  }

  searchEmployeeResult: any;

  searchEmployeeFormGroup: FormGroup = new FormGroup({
    empName: new FormControl(),
    empSex: new FormControl(),
    empEmail: new FormControl(),
    empPhone: new FormControl(),
    sal: new FormControl(),
    job: new FormControl(),
    deptName: new FormControl(),
    bossName: new FormControl(),
    empIdCard: new FormControl(),
  })

  public searchEmployee() {
    this.service.searchEmployee(this.searchEmployeeFormGroup.value).subscribe((res) => {
      console.log(res);
      this.searchEmployeeResult = res;
    })
  }
  public clean(){
    this.searchEmployeeFormGroup.reset();
  }

  //删除员工

  public deleteEmp(empId: string) {
    this.service.deleteEmp(empId).subscribe((res) => {
      this.showEmp();
      
      return;
    })
    this.showUpdateEmpForm = false;
    alert('删除成功');
  }


  addEmpDialogIsVisible: boolean = false;

  addEmpFromGroup: FormGroup = new FormGroup({
    empName: new FormControl(),
    empSex: new FormControl(),
    birthDateTime: new FormControl(),
    empEmail: new FormControl(),
    empPhone: new FormControl(),
    sal: new FormControl(),
    job: new FormControl(),
    deptId: new FormControl(),
    deptName: new FormControl(),
    bossId: new FormControl(),
    bossName: new FormControl(),
    inDateTime: new FormControl(),
    outDateTime: new FormControl(),
    empIdCard: new FormControl(),
  });

  emp:Emp=new Emp('','','','','','','','','','','','','','','','');
  currentEmp:Emp=new Emp('','','','','','','','','','','','','','','','');
//默认不展示，用于控制是否添加窗口
  showAddEmpForm:boolean=false;
//用于更新窗口
showUpdateEmpForm:boolean=false;

  //更新员工
  public updateEmp() {
    this.service.updateEmp(this.currentEmp).subscribe((res) => {
      this.showEmp();
    });
    this.showUpdateEmpForm = false;
    alert('更新成功');
  }

  //打开更新员工窗口
  public showUpdateForm(emp: Emp) {
    this.showUpdateEmpForm = true;
    this.currentEmp = JSON.parse(JSON.stringify(emp));

  }
  //关闭更新员工窗口
  public cancelUpdateEmpForm() {
    this.showUpdateEmpForm = false;
  
  }
  
}