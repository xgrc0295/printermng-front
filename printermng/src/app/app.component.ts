import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items!: MenuItem[];
  title = 'PrinterMNG';

  ngOnInit(): void {
    this.items = [
      {
        label: '打印机供销系统',
        items: [
          {
            label: '主页',
            icon: 'pi pi-bars',
            url: '#',
            routerLink: '/home',
          },
        ],
      },
      {
        label: '采购',
        items: [
          {
            label: '打印机采购',
            icon: 'pi pi-angle-right',
            url: '#',
            routerLink: '/procure',
          },
        ],
      },
      {
        label: '销售',
        items: [
          {
            label: '打印机销售',
            icon: 'pi pi-angle-right',
            url: '#',
            routerLink: '/sales',
          },
          {
            label: '销售历史记录',
            icon: 'pi pi-angle-right',
            url: '#',
            routerLink: '/salesHistory',
          },
        ],
      },
      {
        label: '库存',
        items: [
          {
            label: '库存查看',
            icon: 'pi pi-angle-right',
            url: '#',
            routerLink: '/warehouse',
          },
        ],
      },
      {
        label: '利润',
        items: [
          {
            label: '利润查看',
            icon: 'pi pi-angle-right',
            url: '#',
            routerLink: '/profile',
          },
        ],
      },
      {
        label: '管理',
        items: [
          {
            label: '添加员工',
            icon: 'pi pi-angle-right',
            routerLink: '/emp',
          },
          {
            label: '检索员工',
            icon: 'pi pi-angle-right',
            routerLink: '/showemp',
          },
          {
            label: '故障查看',
            icon: 'pi pi-angle-right',
            routerLink: '/fault',
          },
          {
            label: '故障修改',
            icon: 'pi pi-angle-right',
            routerLink: '/update',
          },
          {
            label: '购买力排行',
            icon: 'pi pi-angle-right',
            routerLink: '/customerRank',
          },
          {
            label: '顾客管理',
            icon: 'pi pi-angle-right',
            routerLink: '/customer',
          },
        ],
      },
    ];
  }
}
