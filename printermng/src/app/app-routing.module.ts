import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { HomeComponent } from './home/home.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { ProcureComponent } from './procure/procure.component';
import { CommonModule } from '@angular/common';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomerComponent } from './customer/customer.component';
import { RankComponent } from './rank/rank.component';
import { EmpComponent } from './emp/emp.component';
import { FaultComponent } from './fault/fault.component';
import { ShowempComponent } from './showemp/showemp.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'procure', component: ProcureComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'salesHistory', component: SalesHistoryComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customerRank', component: RankComponent },
  { path: 'emp', component: EmpComponent },
  { path: 'fault', component: FaultComponent },
  { path: 'showemp', component: ShowempComponent },
  { path: 'update', component: UpdateComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
