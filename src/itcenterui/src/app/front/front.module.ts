import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { AboutComponent } from './body/about/about.component';
import { AboutUsComponent } from './body/about-us/about-us.component';
import { BlogComponent } from './body/blog/blog.component';
import { BlogContentComponent } from './body/blog-content/blog-content.component';
import { BottomComponent } from './bottom/bottom.component';
import { CourseComponent } from './body/course/course.component';
import { FooterComponent } from './bottom/footer/footer.component';
import { BodyComponent } from './body/body.component';
import { CampusComponent } from './body/campus/campus.component';
import { ContactUsComponent } from './body/contact-us/contact-us.component';
import { ContactComponent } from './body/contact/contact.component';
import { CourseListComponent } from './body/course-list/course-list.component';
import { FacilitiesComponent } from './body/facilities/facilities.component';
import { LocationComponent } from './body/location/location.component';
import { MainBodyComponent } from './body/main-body/main-body.component';
import { TestimonialComponent } from './body/testimonial/testimonial.component';
import { CtaComponent } from './bottom/cta/cta.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './top/header/header.component';
import { NavComponent } from './top/nav/nav.component';
import { SubHeaderComponent } from './top/sub-header/sub-header.component';
import { TextBoxComponent } from './top/text-box/text-box.component';
import { TopComponent } from './top/top.component';
import { LoginComponent } from './body/login/login.component';
import { LoadingComponent } from '.././component/loading/loading.component';
import { LoadingFromComponent } from '.././component/loading-from/loading-from.component';
import { DialogComponent } from '.././component/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FromComponent } from './body/from/from.component';
import { TeacherCourseComponent } from './body/teacher-course/teacher-course.component';
import { MainTeacherCourseComponent } from './body/main-teacher-course/main-teacher-course.component';
import { DialogTeacherCourseComponent } from './body/dialog-teacher-course/dialog-teacher-course.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TeacherCourseClassComponent } from './body/teacher-course-class/teacher-course-class.component';
import { DialogCourseClassComponent } from './body/dialog-course-class/dialog-course-class.component';
import { DialogCheckedComponent } from './body/dialog-checked/dialog-checked.component';
import { LabelComponent } from './top/label/label.component';
import { SidebarBrandComponent } from './top/sidebar-brand/sidebar-brand.component';
import { SidebarMenuComponent } from './top/sidebar-menu/sidebar-menu.component';
import { UserWrapperComponent } from './top/user-wrapper/user-wrapper.component';
import { FromTeacherComponent } from './from/from-teacher/from-teacher.component';
import { ThemeComponent } from './body/theme/theme.component';
import { TeacherThemeComponent } from './body/teacher-theme/teacher-theme.component';
import { FromThemeComponent } from './from/from-theme/from-theme.component';
import { FromThemeEditComponent } from './from/from-theme-edit/from-theme-edit.component';
import { TableVideoThemeComponent } from './body/table-video-theme/table-video-theme.component';
import { LessonComponent } from './body/lesson/lesson.component';
import { FromLessonComponent } from './from/from-lesson/from-lesson.component';
import { FromLessonEditComponent } from './from/from-lesson-edit/from-lesson-edit.component';
import { DialogThemeComponent } from './body/dialog-theme/dialog-theme.component';
import { TeacherCourseFalseComponent } from './body/teacher-course-false/teacher-course-false.component';
import { MainQuizComponent } from './quiz/main-quiz/main-quiz.component';
import { QuizComponent } from './quiz/quiz/quiz.component';
import { FromQuizComponent } from './quiz/from-quiz/from-quiz.component';
import { QuestionComponent } from './question/question/question.component';
import { TableQuestionComponent } from './question/table-question/table-question.component';
import { FromQuestionComponent } from './question/from-question/from-question.component';
import { FromCreateQuestionComponent } from './quiz/from-create-question/from-create-question.component';
import { UserQuestionComponent } from './question/user-question/user-question.component';
import { DetailComponent } from './detail/detail.component';
import { MakeQuestionComponent } from './question/make-question/make-question.component';
import { FromExamEditComponent } from './quiz/from-exam-edit/from-exam-edit.component';
import { RegisterComponent } from './body/register/register.component';
import { CourseUserComponent } from './body/course-user/course-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListStudentComponent } from './list-student/list-student.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { FromListStudentComponent } from './from/from-list-student/from-list-student.component';
import { VideoCourseComponent } from './video-course/video-course.component';
import { WatchVideoComponent } from './watch-video/watch-video.component';

@NgModule({
  declarations: [ 
    HeaderComponent,
    CourseComponent,
    CampusComponent,
    FacilitiesComponent,
    TestimonialComponent,
    FooterComponent,
    MainBodyComponent,
    SubHeaderComponent,
    CourseListComponent,
    LocationComponent,
    ContactUsComponent,
    ContactComponent,
    BlogContentComponent,
    BlogComponent,
    AboutUsComponent,
    AboutComponent,
    HomeComponent,
    NavComponent,
    TextBoxComponent,
    CtaComponent,
    TopComponent,
    BottomComponent,
    BodyComponent,
    LoginComponent,
    LoadingComponent,
    LoadingFromComponent,
    DialogComponent,
    FromComponent,
    TeacherCourseComponent,
    MainTeacherCourseComponent,
    DialogTeacherCourseComponent,
    TeacherCourseClassComponent,
    DialogCourseClassComponent,
    DialogCheckedComponent,
    LabelComponent,
    SidebarBrandComponent,
    SidebarMenuComponent,
    UserWrapperComponent,
    FromTeacherComponent,
    ThemeComponent,
    TeacherThemeComponent,
    FromThemeComponent,
    FromThemeEditComponent,
    TableVideoThemeComponent,
    LessonComponent,
    FromLessonComponent,
    FromLessonEditComponent,
    DialogThemeComponent,
    TeacherCourseFalseComponent,
    MainQuizComponent,
    QuizComponent,
    FromQuizComponent,
    QuestionComponent,
    TableQuestionComponent,
    FromQuestionComponent,
    FromCreateQuestionComponent,
    UserQuestionComponent,
    DetailComponent,
    MakeQuestionComponent,
    FromExamEditComponent,
    RegisterComponent,
    CourseUserComponent,
    ListStudentComponent,
    CreateCourseComponent,
    FromListStudentComponent,
    VideoCourseComponent,
    WatchVideoComponent,
    
    
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSliderModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    NgbModule,
  ],
  entryComponents: [
    LoginComponent,
  ],
})
export class FrontModule { }
