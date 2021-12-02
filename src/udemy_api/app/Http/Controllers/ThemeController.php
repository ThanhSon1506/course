<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Theme;
use App\Course;
use Validator;
class ThemeController extends Controller
{
    public function index(){
        return Theme::with('course')->get();
    }

    
    public function create(Request $request){
        $rule=['name'=>'required|min:3|max:50|unique:themes',
                'course_id'=>'required'
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $theme=Theme::where('name',$request['name'])->first();
        if($theme){
            $response['status']=0;
            $response['message']='Name Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $theme=Theme::create([
                'name'=>$request->name,
                'course_id'=>$request->course_id,
            ]);   
            $response['status']=1;
            $response['message']='Create Name Successfully';
            $response['code']=200;
            return response()->json($response); 
    }



    public function update(Request $request,$id){
        $rule=['name'=>'required|min:3|max:50|unique:themes',
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
    $theme=Theme::find($id);
    if(!$theme){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $theme->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $theme->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $theme=Theme::find($id);
        if(is_null($theme)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $theme->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
    
    public function destroyCourse($id){
        $session = Theme::with('course')->where('course_id','=', $id)->get();
        $count=Theme::with('course')->where('course_id','=',$id)->count();
       
        if(is_null($session)){
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
       foreach($session as $e){
           $e->delete();
       }
        $response['status']=1;
        $response['message']="Delete all Succeessfully";
        $response['code']=200;

        return response()->json($response);
}   

public function getThemeFindCourse($id){
    $session = Theme::with('course')->where('course_id', '=', $id)->get();
    $count = Theme::with('course')->where('course_id', '=', $id)->get()->count();
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
        
    if(!$session){
        $response['status']=0;
        $response['message']='Could Not Find Course';
        $response['code']=409; 
        return response()->json($response);
    }
    return $session;
      
}

// public function indexTheme($id){
//     $array_1=[];
//     $course= Course::where('teacher_id','=',$id)->get();
//     foreach($course as $c){          
//         $array_1[]=$c->id;   
//     }
//     // $session = Theme::with('course')->where('course_id', '=', $id)->get();
//     return $array_1;
// }

}
