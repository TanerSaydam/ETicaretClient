import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin",
    loadChildren: ()=> import("./admin/layouts/layouts.module").then(m=>m.LayoutsModule), 
    canActivateChild: [AuthGuard]   
  },
  {
    path: "", component: HomeComponent
  },
  {
    path: "baskets",
    loadChildren:()=> import("./ui/components/baskets/baskets.module").then(m=> m.BasketsModule)
  },
  {
    path: "register",
    loadChildren:()=> import("./ui/components/register/register.module").then(m=> m.RegisterModule)
  },
  {
    path: "login",
    loadChildren:()=> import("./ui/components/login/login.module").then(m=> m.LoginModule)
  },
  {
    path: "products",
    loadChildren:()=> import("./ui/components/products/products.module").then(m=> m.ProductsModule)
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
