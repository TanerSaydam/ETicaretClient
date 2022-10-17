import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: "",
        component: LayoutsComponent,
        children: [
          {
            path: "",
            loadChildren: ()=> import("../components/dashboards/dashboards.module").then(m=> m.DashboardsModule)
          },
          {
            path: "customers",
            loadChildren: ()=> import("../components/customers/customers.module").then(m=> m.CustomersModule)
          },
          {
            path: "orders",
            loadChildren: ()=> import("../components/orders/orders.module").then(m=> m.OrdersModule)
          },
          {
            path: "products",
            loadChildren: ()=> import("../components/products/products.module").then(m=> m.ProductsModule)
          },
        ]    
      }
    ]),
    MatSidenavModule
  ]
})
export class LayoutsModule { }
