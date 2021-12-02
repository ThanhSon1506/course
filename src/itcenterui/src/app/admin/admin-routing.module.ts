import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './body/accounts/accounts.component';
import { CourseComponent } from './body/course/course.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { PersonComponent } from './body/person/person.component';
import { PagenotfoundComponent } from '.././component/pagenotfound/pagenotfound.component';
import { StudentComponent } from './body/student/student.component';
import { FromAccountComponent } from './from/from-account/from-account.component';
import { PositionComponent } from './body/position/position.component';
import { AdminGuard } from '../admin.guard';
import { LanguageComponent } from './body/language/language.component';
import { LevelComponent } from './body/level/level.component';
import { CategoryComponent } from './body/category/category.component';
import { TeacherComponent } from './body/teacher/teacher.component';
import { ExamComponent } from './body/exam/exam.component';
import { ListstudentComponent } from './body/liststudent/liststudent.component';
const routes: Routes = [
// {path:'admin',redirectTo:'/dashboard',pathMatch:'full'},
// {path:'admin/**',component:DashboardComponent},
{path:'',component:AccountsComponent,canActivate:[AdminGuard]},
{path:'dashboard',component:DashboardComponent,canActivate:[AdminGuard]},  
{path:'accounts',component:AccountsComponent,canActivate:[AdminGuard]},
{path:'level',component:LevelComponent,canActivate:[AdminGuard]},
{path:'course',component:CourseComponent,canActivate:[AdminGuard]},
{path:'person',component:PersonComponent,canActivate:[AdminGuard]},
{path:'language',component:LanguageComponent,canActivate:[AdminGuard]},
{path:'positions',component:PositionComponent,canActivate:[AdminGuard]},
{path:'category',component:CategoryComponent,canActivate:[AdminGuard]},
{path:'student',component:StudentComponent,canActivate:[AdminGuard]},
{path:'teacher',component:TeacherComponent,canActivate:[AdminGuard]},
{path:'exam',component:ExamComponent,canActivate:[AdminGuard]},
{path:'list-student',component:ListstudentComponent,canActivate:[AdminGuard]},
{path:'register',component:FromAccountComponent},
// {path:'**',component:PagenotfoundComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
