import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Emp } from '../Emp';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  constructor(private service: EmpServiceService) { }
  
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
          console.log(this.result);
          total++;
        }
      }
    }
    return total;
  }

  selectedGroup: any;

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

  public showAddEmpDialog() {
    this.addEmpDialogIsVisible = true;
  }

  public cancelAddEmp() {
    this.addEmpDialogIsVisible = false;
  }

  public addEmp() {

    // 获取表单值
    const formValue = this.addEmpFromGroup.value;

    // 创建新的表单值，只包含 selectedGroup 的 groupName 属性
    const newFormValue = {
      empId: '',
      empName: formValue.empName,
      empSex: formValue.empSex,
      birthDateTime: formValue.birthDateTime,
      empEmail: formValue.empEmail,
      empPhone: formValue.empPhone,
      sal: formValue.sal,
      job: formValue.job,
      deptId: formValue.deptId,
      deptName: formValue.deptName,
      bossId: formValue.bossId,
      bossName: formValue.bossName,
      inDateTime: formValue.inDateTime,
      outDateTime: formValue.outDateTime,
      stateFlag: 'false',
      empIdCard: formValue.empIdCard,
    };

    this.service.addEmp(newFormValue).subscribe((res) => {
      this.showEmp();
      this.addEmpFromGroup.reset();
      this.addEmpDialogIsVisible = false;
    });
  }

  public clean(){
    this.addEmpFromGroup.reset();
  }

  groups = [
    { deptName: '销售部', deptId: 'sale' },
    { deptName: '采购部', deptId: 'buy' },
    { deptName: '维修部', deptId: 'repair' },
  ];

  //搜索员工
  searchEmployeeResult: any;

  searchEmployeeFormGroup: FormGroup = new FormGroup({
    groupName: new FormControl(),
    empIdCard: new FormControl(),
    deptName: new FormControl()
  })

  public searchEmployee() {
    this.service.searchEmployee(this.searchEmployeeFormGroup.value).subscribe((res) => {
      console.log(res);
      this.searchEmployeeResult = res;
    })
  }

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
    this.addEmpDialogIsVisible = false;

  }
  //关闭更新员工窗口
  public cancelUpdateEmpForm() {
    this.showUpdateEmpForm = false;
  }

  //删除员工

  public deleteEmp(empId: string) {
    this.service.deleteEmp(empId).subscribe((res) => {
      this.showEmp();
      alert('删除成功');
    })
  }
}
