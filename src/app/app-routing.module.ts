import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin",
    loadChildren: ()=> import("./admin/layouts/layouts.module").then(m=>m.LayoutsModule),    
  },
  {
    path: "", component: HomeComponent
  },
  {
    path: "baskets",
    loadChildren:()=> import("./ui/components/baskets/baskets.module").then(m=> m.BasketsModule)
  },
  {
    path: "products",
    loadChildren:()=> import("./ui/components/products/products.module").then(m=> m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
