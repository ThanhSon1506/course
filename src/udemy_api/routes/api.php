<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Route's account, building your API account
Route::group(['prefix'=>'/account'],function(){
    Route::get('index','UserController@index');
    Route::get('find/{id}','UserController@findUserPosition');
    Route::get('account-del','UserController@index_del');
    Route::post('register','UserController@register');
    Route::post('login','UserController@login');
    Route::delete('delete/{id}','UserController@delete');
    Route::delete('destroy/{id}','UserController@destroy');
    Route::patch('update/{id}','UserController@update');
    Route::get('idDropAccount','UserController@idDropAccount');
});
//Route's position, building your API position
Route::group(['prefix'=>'/position'],function(){
    Route::get('index','PositionController@index');
    Route::post('create','PositionController@create');
    Route::patch('update/{id}','PositionController@update');
    Route::delete('delete/{id}','PositionController@delete');
});
//Route's category,building your API category
Route::group(['prefix'=>'/category'],function(){
    Route::get('index','CategoryController@index');
    Route::post('create','CategoryController@create');
    Route::patch('update/{id}','CategoryController@update');
    Route::delete('delete/{id}','CategoryController@delete');
});
//Route's level. building your API level
Route::group(['prefix'=>'/level'],function(){
    Route::get('index','LevelController@index');
    Route::post('create','LevelController@create');
    Route::patch('update/{id}','LevelController@update');
    Route::delete('delete/{id}','LevelController@delete');
});
//Route's language, building your API language
Route::group(['prefix'=>'/language'],function(){
    Route::get('index','LanguageController@index');
    Route::post('create','LanguageController@create');
    Route::patch('update/{id}','LanguageController@update');
    Route::delete('delete/{id}','LanguageController@delete');
});
//Route's course, building your API course
Route::group(['prefix'=>'/course'],function(){
    Route::get('teacher/{id}','CourseController@courseTeacher');
    Route::get('teacherTrue/{id}','CourseController@courseTeacherTrue');
    Route::get('index','CourseController@index');
    Route::get('indexFalse','CourseController@indexFalse');
    Route::get('language/{id}','CourseController@findCourseByLanguage');
    Route::get('level/{id}','CourseController@findCourseByLevel');
    Route::get('category/{id}','CourseController@findCourseByCategory');
    Route::get('findTeacher/{id}','CourseController@findCourseByTeacher');
    Route::post('create','CourseController@create');    
    Route::post('updateImg/{id}','CourseController@updateImg');
    Route::delete('delete/{id}','CourseController@delete');
    Route::patch('update/{id}','CourseController@update');
    Route::delete('destroy/category/{id}','CourseController@destroyCategory');
    Route::delete('destroy/level/{id}','CourseController@destroyLevel');
    Route::delete('destroy/language/{id}','CourseController@destroyLanguage');
    Route::delete('destroy/teacher/{id}','CourseController@destroyTeacher');
    Route::get('count','CourseController@countCourse');
    Route::get('swap/{id}','CourseController@swap');
    Route::get('findCourse/{id}','CourseController@findCourse');
    Route::get('indexUser','CourseController@indexUser');
    Route::get('indexDesc','CourseController@indexDesc');
    Route::get('indexAsc','CourseController@indexAsc');
});
Route::group(['prefix'=>'/student'],function(){
    Route::get('index','StudentController@index');
    Route::post('create','StudentController@create');
    Route::patch('update/{id}','StudentController@update');
    Route::delete('delete/{id}','StudentController@delete');
    Route::get('account/{id}','StudentController@findStudentAccount');
    Route::get('sameAccount','StudentController@sameStudentAccount');

});
Route::group(['prefix'=>'/staff'],function(){
    Route::get('index','StaffController@index');
    Route::post('create','StaffController@create');
    Route::patch('update/{id}','StaffController@update');
    Route::delete('delete/{id}','StaffController@delete');
});
Route::group(['prefix'=>'/teacher'],function(){
    
    Route::get('index','TeacherController@index');
    Route::post('create','TeacherController@create');
    Route::patch('update/{id}','TeacherController@update');
    Route::delete('delete/{id}','TeacherController@delete');
    Route::get('sameAccount','TeacherController@sameTeacherAccount');
    Route::get('account/{id}','TeacherController@findTeacherAccount');
    Route::get('cousrse/{id}','TeacherController@findTeacher');
});
Route::group(['prefix'=>'/video'],function(){
    Route::post('createVideo','videoController@createVideo');
    Route::get('index','VideoController@index');
    Route::post('create','VideoController@create');
    Route::patch('update/{id}','VideoController@update');
    Route::delete('delete/{id}','VideoController@delete');
    Route::get('sameAccount','VideoController@sameTeacherAccount');
    Route::get('account/{id}','VideoController@findTeacherAccount');
    Route::get('theme/{id}','VideoController@findVideoByTheme');
    Route::delete('destroy/theme/{id}','VideoController@destroySession');

});
Route::group(['prefix'=>'/project'],function(){
    Route::get('index','ProjectController@index');
    Route::get('getIndex/{id}','ProjectController@getIndex');
    Route::post('create','ProjectController@create');
    Route::patch('update/{id}','ProjectController@update');
    Route::delete('delete/{id}','ProjectController@delete');
    Route::get('sameAccount','ProjectController@sameTeacherAccount');
    Route::get('account/{id}','ProjectController@findTeacherAccount');
});
Route::group(['prefix'=>'/theme'],function(){
    Route::get('course/{id}','ThemeController@getThemeFindCourse');
    Route::delete('destroy/course/{id}','ThemeController@destroyCourse');
    Route::get('index','ThemeController@index');
    Route::post('create','ThemeController@create');
    Route::patch('update/{id}','ThemeController@update');
    Route::delete('delete/{id}','ThemeController@delete');
    Route::get('indexTheme/{id}','ThemeController@indexTheme');

});

Route::group(['prefix'=>'/exam'],function(){
    Route::get('course/{id}','ExamController@getThemeFindCourse');
    Route::delete('destroy/course/{id}','ExamController@destroyCourse');
    Route::get('index','ExamController@index');
    Route::post('create','ExamController@create');
    Route::patch('update/{id}','ExamController@update');
    Route::delete('delete/{id}','ExamController@delete');
    Route::get('indexTheme/{id}','ExamController@indexTheme');
    Route::post('findExam','ExamController@findExam');
    Route::get('findQuestionByExam/{id}','ExamController@findQuestionByExam');
    Route::get('readExam/{id}','ExamController@readExam');
});

Route::group(['prefix'=>'/question'],function(){
    Route::get('index','QuestionController@index');
    Route::post('create','QuestionController@create');
    Route::patch('update/{id}','QuestionController@update');
    Route::delete('delete/{id}','QuestionController@delete');
    Route::get('readQuestion/{id}','QuestionController@readQuestion');
});

Route::group(['prefix'=>'/comment'],function(){
    Route::get('index/{id}','CommentController@index');
    Route::post('create','CommentController@create');
    Route::patch('update/{id}','CommentController@update');
    Route::delete('delete/{id}','CommentController@delete');
    Route::get('readQuestion/{id}','CommentController@readQuestion');
});

Route::group(['prefix'=>'/liststudent'],function(){
    Route::get('index','ListStudentController@index');
    Route::get('index-false','ListStudentController@index_false');
    Route::post('create','ListStudentController@create');
    Route::patch('update/{id}','ListStudentController@update');
    Route::delete('delete/{id}','ListStudentController@delete');
    Route::get('swap/{id}','ListStudentController@swap');
    Route::get('count','ListStudentController@count');
    Route::get('find/{id}','ListStudentController@findStudenByCourse');
    Route::post('check','ListStudentController@checkStudent');
    // Route::get('readQuestion/{id}','ListStudentController@readQuestion');
});



