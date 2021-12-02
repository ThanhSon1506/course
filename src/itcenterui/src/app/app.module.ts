import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontModule } from './front/front.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { ComponentComponent } from './component/component.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { DialogDeleteComponent } from './component/dialog-delete/dialog-delete.component';
import { DialogCategoryComponent } from './component/dialog-category/dialog-category.component';
import { DialogLanguageComponent } from './component/dialog-language/dialog-language.component';
import { DialogLevelComponent } from './component/dialog-level/dialog-level.component';
import { DialogCourseComponent } from './component/dialog-course/dialog-course.component';
import { DialogTeacherComponent } from './component/dialog-teacher/dialog-teacher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    PagenotfoundComponent,
    DialogDeleteComponent,
    DialogCategoryComponent,
    DialogLanguageComponent,
    DialogLevelComponent,
    DialogCourseComponent,
    DialogTeacherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FrontModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule, 
  ],
  exports:[
    AdminModule,
    FrontModule,
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
