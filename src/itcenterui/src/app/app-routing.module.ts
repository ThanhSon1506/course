import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { LoginComponent } from './front/body/login/login.component';
import { RegisterComponent } from './front/body/register/register.component';

const routes: Routes = [
  
  {path:'',loadChildren:()=>import('./front/front.module').then(m=>m.FrontModule)},//lazy load
  
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},//lazy load
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},


  {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
