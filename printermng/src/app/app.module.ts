import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// PrimeNG模块
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SalesComponent } from './sales/sales.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { HomeComponent } from './home/home.component';
import { ProcureComponent } from './procure/procure.component';
import { HeaderComponent } from './header/header.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CustomerComponent } from './customer/customer.component';
import { RankComponent } from './rank/rank.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FaultComponent } from './fault/fault.component';
import { UpdateComponent } from './update/update.component';
import { EmpComponent } from './emp/emp.component';
import { ShowempComponent } from './showemp/showemp.component';
@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    SalesHistoryComponent,
    HomeComponent,
    ProcureComponent,
    HeaderComponent,
    WarehouseComponent,
    ProfileComponent,
    CustomerComponent,
    RankComponent,
    FaultComponent,
    UpdateComponent,
    EmpComponent,
    ShowempComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    SlideMenuModule,
    CalendarModule,
    TabMenuModule,
    InputTextareaModule,
    MenuModule,
    CardModule,
    BreadcrumbModule,
    AppRoutingModule,
    ConfirmPopupModule,
    MessagesModule,
    ChartModule,
    SelectButtonModule,
    ScrollPanelModule,
    RadioButtonModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
