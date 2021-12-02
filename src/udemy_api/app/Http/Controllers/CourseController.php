<?php

namespace App\Http\Controllers;
use App\course;
use Illuminate\Http\Request;
use Validator;
use Carbon\Carbon;

class CourseController extends Controller
{
    public function index(){
        $course=Course::with('language')->with('category')->with('level')->with('teacher')->where('status','=','1')->get();
        return $course;
    }
    public function indexUser(){
        $month=Carbon::now()->month; //tháng
        $course=Course::with('language')->with('category')->with('level')->with('teacher')->where('status','=','1')->whereMonth('created_at',$month)->limit(6)->get();
        return $course;
    }

    public function indexDesc(){
        $course=Course::with('language')->with('category')->with('level')->with('teacher')->where('status','=','1')->orderBy('price','desc')->limit(6)->get();
        return $course;
    }

    public function indexAsc(){
        $course=Course::with('language')->with('category')->with('level')->with('teacher')->where('status','=','1')->orderBy('price','asc')->limit(6)->get();
        return $course;
    }
    public function indexFalse(){
        $course=Course::with('language')->with('category')->with('level')->with('teacher')->where('status','=','0')->get();
        return $course;
    }

    public function findCourseByLanguage($id){

        $course = Course::with('language')->where('language_id', '=', $id)->get();
        $count = Course::with('language')->where('language_id', '=', $id)->get()->count();
        if($count==0){
            $response['status']=0;
            $response['message']='The database data is empty.';
            $response['code']=409; 
            return response()->json($response);
        }
        if(is_null($id)){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
            
        if(!$course){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
        return $course;
    
    }

    public function findCourseByLevel($id){

        $course = Course::with('level')->where('level_id', '=', $id)->get();
        $count = Course::with('level')->where('level_id', '=', $id)->get()->count();
        if($count==0){
            $response['status']=0;
            $response['message']='The database data is empty.';
            $response['code']=409; 
            return response()->json($response);
        }
        if(is_null($id)){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
            
        if(!$course){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
        return $course;
    
    }

    public function findCourseByCategory($id){

        $course = Course::with('category')->where('category_id', '=', $id)->get();
        $count = Course::with('category')->where('category_id', '=', $id)->get()->count();
        if($count==0){
            $response['status']=0;
            $response['message']='The database data is empty.';
            $response['code']=409; 
            return response()->json($response);
        }
        if(is_null($id)){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
            
        if(!$course){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
        return $course;
    
    }

    public function findCourseByTeacher($id){

        $course = Course::with('teacher')->where('teacher_id', '=', $id)->get();
        $count = Course::with('teacher')->where('teacher_id', '=', $id)->get()->count();
        if($count==0){
            $response['status']=0;
            $response['message']='The database data is empty.';
            $response['code']=409; 
            return response()->json($response);
        }
        if(is_null($id)){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
            
        if(!$course){
            $response['status']=0;
            $response['message']='Could Not Find Course';
            $response['code']=409; 
            return response()->json($response);
        }
        return $course;
    
    }


    public function delete($id){
        $course=Course::find($id);
        if(is_null($course)){
            $response['status']=0;
            $response['message']="Course Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $course->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }

    public function destroyCategory($id){
        $course = Course::with('category')->where('category_id','=', $id)->get();
        $count=Course::with('category')->where('category_id','=',$id)->count();
       
        if(is_null($course)){
            $response['status']=0;
            $response['message']="Course Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        if($count==0){
            $response['status']=0;
            $response['message']="There are no more accounts";
            $response['code']=404; 
            return response()->json($response);
        }
       foreach($course as $e){
           $e->delete();
       }
        $response['status']=1;
        $response['message']="Delete all Succeessfully";
        $response['code']=200;

        return response()->json($response);
}   


public function destroyTeacher($id){
    $course = Course::with('teacher')->where('teacher_id','=', $id)->get();
    $count=Course::with('teacher')->where('teacher_id','=',$id)->count();
   
    if(is_null($course)){
        $response['status']=0;
        $response['message']="Course Not Found";
        $response['code']=404; 
        return response()->json($response);
    }
    if($count==0){
        $response['status']=0;
        $response['message']="There are no more accounts";
        $response['code']=404; 
        return response()->json($response);
    }
   foreach($course as $e){
       $e->delete();
   }
    $response['status']=1;
    $response['message']="Delete all Succeessfully";
    $response['code']=200;

    return response()->json($response);
}   

public function destroyLanguage($id){
    $course = Course::with('language')->where('language_id','=', $id)->get();
    $count=Course::with('language')->where('language_id','',$id)->count();
    if(is_null($course)){
        $response['status']=0;
        $response['message']="Course Not Found";
        $response['code']=404; 
        return response()->json($response);
    }
    if($count==0){
        $response['status']=0;
        $response['message']="There are no more accounts";
        $response['code']=404; 
        return response()->json($response);
    }

   foreach($course as $e){
       $e->delete();
   }
    $response['status']=1;
    $response['message']="Delete all Succeessfully";
    $response['code']=200;

    return response()->json($response);
}

public function destroyLevel($id){
    $course = Course::with('level')->where('level_id','=', $id)->get();
    $count=Course::with('level')->where('level_id','=',$id)->count();
    if(is_null($course)){
        $response['status']=0;
        $response['message']="Course Not Found";
        $response['code']=404; 
        return response()->json($response);
    }
    if($count==0){
        $response['status']=0;
        $response['message']="There are no more accounts";
        $response['code']=404; 
        return response()->json($response);
    }
   foreach($course as $e){
       $e->delete();
   }
    $response['status']=1;
    $response['message']="Delete all Succeessfully";
    $response['code']=200;

    return response()->json($response);
}
public function create(Request $request){
    $course = new course;
    $exits=Course::where('name',$request['name'])->first();
    $rule=['name'=>'required|min:3|max:100|unique:courses',
            'category_id'=>'required|alpha_num',
            'level_id'=>'required|alpha_num',
            'language_id'=>'required|alpha_num',

            'photo'=>'required|max:200|mimes:jpg,png|file',
            'price'=>'required',
        ];
    
    $validator=Validator::make($request->all(),$rule);
   
    if($exits){
        $response['status']=0;
        $response['message']='Course Already Exists';
        $response['code']=409; 
        return response()->json($response);   
    }
    if($validator->fails()){
        $response['status']=0;
        $response['message']=$validator->errors()->first();
        $response['code']=400; 
        return response()->json($response);
    }
    
    if($request->hasFile('photo')){
        $completeFileName=$request->file('photo')->getClientOriginalName();
        $fileNameOnly=pathinfo($completeFileName,PATHINFO_FILENAME);
        $extenshion=$request->file('photo')->getClientOriginalExtension();
        $compPhoto=str_replace('','',$fileNameOnly).'-'.rand().'-'.time().'.'.$extenshion;
        $path=$request->file('photo')->storeAs('public/courses',$compPhoto);
        $course->photo=$compPhoto; 
    }
    $course->name=$request->name;
    $course->category_id=$request->category_id;
    $course->level_id=$request->level_id;
    $course->language_id=$request->language_id;
    $course->price=$request->price;
    $course->teacher_id=$request->teacher_id;

    if($course->save()){
        $response['status']=1;
        $response['message']="Create Succeessfully";
        $response['code']=200;
        return response()->json($response);
    }
    if(!$course->save()){
        $response['status']=0;
        $response['message']='create Failure';
        $response['code']=409; 
        return response()->json($response);    
    }

 }


 public function updateImg(Request $request,$id){
    // $course = new course;
    $exits=Course::where('name',$request['name'])->first();
    $course=Course::find($id);
    $rule=['name'=>'min:3|max:100|unique:courses',
            'photo'=>'max:200|mimes:jpg,png|file',
        ];
    
    $validator=Validator::make($request->all(),$rule);
   
    if($exits){
        $response['status']=0;
        $response['message']='Course Already Exists';
        $response['code']=409; 
        return response()->json($response);   
    }
    if(!$course){
        $response['status']=0;
        $response['message']='Course Not Found';
        $response['code']=404; 
        return response()->json($response);   
    }
    if($validator->fails()){
        $response['status']=0;
        $response['message']=$validator->errors()->first();
        // $response['message']=$request;
        $response['code']=400; 
        return response()->json($response);
    }
    
    if($request->hasFile('photo')){
        $completeFileName=$request->file('photo')->getClientOriginalName();
        $fileNameOnly=pathinfo($completeFileName,PATHINFO_FILENAME);
        $extenshion=$request->file('photo')->getClientOriginalExtension();
        $compPhoto=str_replace('','',$fileNameOnly).'-'.rand().'-'.time().'.'.$extenshion;
        $path=$request->file('photo')->storeAs('public/courses',$compPhoto);
        $course->photo=$compPhoto; 
    }
    $course->name=$request->name;
    $course->category_id=$request->category_id;
    $course->level_id=$request->level_id;
    $course->language_id=$request->language_id;
    $course->price=$request->price; 
    $course->teacher_id=$request->teacher_id;
    if($course->save()){
        $response['status']=1;
        $response['message']="Create Succeessfully";
        $response['code']=200;
        return response()->json($response);
    }
    if(!$course->save()){
        $response['status']=0;
        $response['message']='Create Failure';
        $response['code']=409; 
        return response()->json($response);    
    }

 }


 public function update(Request $request,$id){
    $rule=['name'=>'min:3|max:100|unique:courses',
];
$validator=Validator::make($request->all(),$rule);
if($validator->fails()){
    $response['status']=0;
    $response['message']=$validator->errors()->first();
    $response['code']=400; 
    return response()->json($response);
}
if(is_null($id)){
    $response['status']=0;
    $response['message']='Could Not Find Data';
    $response['code']=409; 
    return response()->json($response);
}
$course=Course::find($id);
if(!$course){
    $response['status']=0;
    $response['message']='Could Not Find Data';
    $response['code']=409; 
    return response()->json($response);
}
$course->update($request->all());
        $response['status']=1;
        $response['message']='Update Successfully';
        $response['code']=200;
        $course->save(); 
return response()->json($response);
} 

public function countCourse(){
    $count=Course::where('status','=',0)->count();
    return $count;
}

public function courseTeacher($id){
    $course=Course::with('level')->with('category')->with('language')->where('teacher_id','=',$id)->where('status','=','0')->get();
    return $course;
}

public function courseTeacherTrue($id){
    $course=Course::with('level')->with('category')->with('language')->where('teacher_id','=',$id)->where('status','=','1')->get();
    return $course;
}

public function swap($id){
    try{
        $course=Course::find($id);
        $course->status=!$course->status;
        $course->save();
        $response['status']=1;
        $response['message']="Accept Successfully";
        $response['code']=200;

    }catch(Exception $e){
        $response['status']=0;
        $response['message']=$e;
        $response['code']=400;
    }
    return $response;
   
}

public function findCourse($id){
    $course=Course::with('level')->with('category')->with('language')->with('teacher')->whereId($id)->get();
    return $course;
}

}