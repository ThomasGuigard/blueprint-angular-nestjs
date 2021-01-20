import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { MainComponent } from './main/main.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import {FormsModule} from "@angular/forms";
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SeeDetailExpenseComponent } from './see-detail-expense/see-detail-expense.component';
import { ModifyExpenseComponent } from './modify-expense/modify-expense.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CredentialInterceptor} from "./interceptors/credential.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ListExpensesComponent,
    MainComponent,
    AddExpenseComponent,
    SelectCategoryComponent,
    SeeDetailExpenseComponent,
    ModifyExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
