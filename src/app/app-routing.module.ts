import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRouteComponent } from './home-route/home-route.component';
import { SearchRouteComponent } from './search-route/search-route.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeRouteComponent
  },
  {
    path: 'search',
    component: SearchRouteComponent
  },
  {
    path: '',
    component: HomeRouteComponent
  },
  {
    path: '*',
    component: HomeRouteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
