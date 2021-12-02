import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './body/about/about.component';
import { BlogComponent } from './body/blog/blog.component';
import { ContactComponent } from './body/contact/contact.component';
import { CourseListComponent } from './body/course-list/course-list.component';
import { LoginComponent } from './body/login/login.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from '.././component/pagenotfound/pagenotfound.component';
import { AuthGuard } from '../../app/auth.guard';
import { TeacherCourseComponent } from './body/teacher-course/teacher-course.component';
import { MainTeacherCourseComponent } from './body/main-teacher-course/main-teacher-course.component';
import { TeacherCourseClassComponent } from './body/teacher-course-class/teacher-course-class.component';
import { ThemeComponent } from './body/theme/theme.component';
import { LessonComponent } from './body/lesson/lesson.component';
import { TeacherGuard } from '../teacher.guard';
import { QuizComponent } from './quiz/quiz/quiz.component';
import { FromQuestionComponent } from './question/from-question/from-question.component';
import { UserQuestionComponent } from './question/user-question/user-question.component';
import { QuestionComponent } from './question/question/question.component';
import { DetailComponent } from './detail/detail.component';
import { MakeQuestionComponent } from './question/make-question/make-question.component';
import { VideoCourseComponent } from './video-course/video-course.component';
// import { AdminGuard } from '../admin.guard';

const routes: Routes = [{path:'',redirectTo:'/home',pathMatch:'full'},
{ path: 'home', component: HomeComponent },
{ path: 'about', component: AboutComponent,canActivate:[AuthGuard]},
{ path: 'blog', component: BlogComponent,canActivate:[AuthGuard]},
{ path:'contact',component: ContactComponent,canActivate:[AuthGuard]},
{ path:'course',component: CourseListComponent,canActivate:[AuthGuard] },
{ path:'quiz',component: QuestionComponent,canActivate:[AuthGuard]},
{ path:'question/:id',component: MakeQuestionComponent,canActivate:[AuthGuard]},
{ path:'course/detail/:id',component: DetailComponent,canActivate:[AuthGuard]},
{ path:'course/video',component: VideoCourseComponent,canActivate:[AuthGuard]},


{ path:'course/teacher',component: TeacherCourseComponent,canActivate:[TeacherGuard] },
{ path:'course/class',component: TeacherCourseClassComponent,canActivate:[TeacherGuard] },
{ path:'course/theme',component: ThemeComponent,canActivate:[TeacherGuard] },
{ path:'course/lesson',component: LessonComponent,canActivate:[TeacherGuard] },
{ path:'course/quiz',component: QuizComponent,canActivate:[TeacherGuard] },
{ path:'course/question',component: FromQuestionComponent,canActivate:[TeacherGuard] },

// { path:'login',component: LoginComponent },
// { path: '**', component: PagenotfoundComponent } // If no matching route found, go back to home route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
