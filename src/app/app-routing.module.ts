import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from "./heroes/heroes.component"; //引入某一个组件路由数组，其中某一个路由指向这个组件的
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
const routes: Routes = [
  { path: "heroes", component: HeroesComponent },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" }, //默认路由
  { path: "detail/:id", component: HeroDetailComponent } //带参数传递
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //首先初始化路由器
  exports: [RouterModule]
})
export class AppRoutingModule {}
