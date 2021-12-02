import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { LayoutComponent } from './body/layout/layout.component';
import { MainComponent } from './body/main/main.component';
import { SidebarComponent } from './top/sidebar-v1/sidebar.component';
import { HeaderComponent } from './top/header-v1/header.component';
import { TableComponent } from './table/table.component';
import { AccountsComponent } from './body/accounts/accounts.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import{MatTableModule} from '@angular/material/table';
import{MatPaginatorModule} from '@angular/material/paginator';
import { SidebarMenuComponent } from './top/sidebar-menu/sidebar-menu.component';
import { UserWrapperComponent } from './top/user-wrapper/user-wrapper.component';
import { SearchWrapperComponent } from './top/search-wrapper/search-wrapper.component';
import { LabelComponent } from './top/label/label.component';
import { SidebarBrandComponent } from './top/sidebar-brand/sidebar-brand.component';
import { CourseComponent } from './body/course/course.component';
import { PersonComponent } from './body/person/person.component';
import { TablePersonComponent } from './table/table-person/table-person.component';
import { TableAccountsComponent } from './table/table-accounts/table-accounts.component';
import { TopComponent } from './top/top.component';
import { TableCourseComponent } from './table/table-course/table-course.component';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { TableAccountDelComponent } from './table/table-account-del/table-account-del.component';
import { FromComponent } from './from/from.component';
import { FromAccountComponent } from './from/from-account/from-account.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { StudentComponent } from './body/student/student.component';
import { FilterComponent } from './filter/filter.component';
import {MatInputModule} from '@angular/material/input';
import { FromAccountEditComponent } from './from/from-account-edit/from-account-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { TablePositionComponent } from './table/table-position/table-position.component';
import { PositionComponent } from './body/position/position.component';
import { FromPositionComponent } from './from/from-position/from-position.component';
import { FromPositionEditComponent } from './from/from-position-edit/from-position-edit.component';
import { LanguageComponent } from './body/language/language.component';
import { TableLanguageComponent } from './table/table-language/table-language.component';
import { FromLanguageComponent } from './from/from-language/from-language.component';
import { FromLanguageEditComponent } from './from/from-language-edit/from-language-edit.component';
import { TableCourseDelComponent } from './table/table-course-del/table-course-del.component';
import { FromCourseEditComponent } from './from/from-course-edit/from-course-edit.component';
import { LevelComponent } from './body/level/level.component';
import { TableLevelComponent } from './table/table-level/table-level.component';
import { FromLevelComponent } from './from/from-level/from-level.component';
import { FromLevelEditComponent } from './from/from-level-edit/from-level-edit.component';
import { TableCourseLevelComponent } from './table/table-course-level/table-course-level.component';
import { CategoryComponent } from './body/category/category.component';
import { FromCategoryComponent } from './from/from-category/from-category.component';
import { FromCategoryEditComponent } from './from/from-category-edit/from-category-edit.component';
import { TableCategoryComponent } from './table/table-category/table-category.component';
import { TableCourseCategoryComponent } from './table/table-course-category/table-course-category.component';
import { FromCourseComponent } from './from/from-course/from-course.component';
import { TableStudentComponent } from './table/table-student/table-student.component';
import { FromStudentComponent } from './from/from-student/from-student.component';
import { FromStudentEditComponent } from './from/from-student-edit/from-student-edit.component';
import { FromAccountStudentComponent } from './from/from-account-student/from-account-student.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TeacherComponent } from './body/teacher/teacher.component';
import { TableTeacherComponent } from './table/table-teacher/table-teacher.component';
import { FromTeacherComponent } from './from/from-teacher/from-teacher.component';
import { FromTeacherEditComponent } from './from/from-teacher-edit/from-teacher-edit.component';
import { TableStudentDelComponent } from './table/table-student-del/table-student-del.component';
import { TableTeacherDelComponent } from './table/table-teacher-del/table-teacher-del.component';
import { TableThemeCourseComponent } from './table/table-theme-course/table-theme-course.component';
import {MatBadgeModule} from '@angular/material/badge';
import { TableCourseFalseComponent } from './table/table-course-false/table-course-false.component';
import { TableCourseTeacherComponent } from './table/table-course-teacher/table-course-teacher.component';
import { ExamComponent } from './body/exam/exam.component';
import { TableExamComponent } from './table/table-exam/table-exam.component';
import { FromExamComponent } from './from/from-exam/from-exam.component';
import { FromExamEditComponent } from './from/from-exam-edit/from-exam-edit.component';
import { ListstudentComponent } from './body/liststudent/liststudent.component';
import { TableListStudentComponent } from './table/table-list-student/table-list-student.component';
import { TableListStudentFalseComponent } from './table/table-list-student-false/table-list-student-false.component';
@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    TableComponent,
    AccountsComponent,
    SidebarMenuComponent,
    UserWrapperComponent,
    SearchWrapperComponent,
    LabelComponent,
    SidebarBrandComponent,
    CourseComponent,
    PersonComponent,
    TablePersonComponent,
    TableAccountsComponent,
    TopComponent,
    TableCourseComponent,
    TableAccountDelComponent,
    FromComponent,
    FromAccountComponent,
    StudentComponent,
    FilterComponent,
    FromAccountEditComponent,
    TablePositionComponent,
    PositionComponent,
    FromPositionComponent,
    FromPositionEditComponent,
    LanguageComponent,
    TableLanguageComponent,
    FromLanguageComponent,
    FromLanguageEditComponent,
    TableCourseDelComponent,
    FromCourseEditComponent,
    LevelComponent,
    TableLevelComponent,
    FromLevelComponent,
    FromLevelEditComponent,
    TableCourseLevelComponent,
    CategoryComponent,
    FromCategoryComponent,
    FromCategoryEditComponent,
    TableCategoryComponent,
    TableCourseCategoryComponent,
    FromCourseComponent,
    TableStudentComponent,
    FromStudentComponent,
    FromAccountStudentComponent,
    TeacherComponent,
    TableTeacherComponent,
    FromTeacherComponent,
    FromTeacherEditComponent,  
    FromStudentEditComponent, TableStudentDelComponent, TableTeacherDelComponent, TableThemeCourseComponent, TableCourseFalseComponent, TableCourseTeacherComponent, ExamComponent, TableExamComponent, FromExamComponent, FromExamEditComponent, ListstudentComponent, TableListStudentComponent, TableListStudentFalseComponent
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    MatBadgeModule 
    // BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    // RouterModule.forRoot(router),

    
  ],
  bootstrap: [TableComponent,FromAccountComponent,FromAccountEditComponent]
})
export class AdminModule { }
