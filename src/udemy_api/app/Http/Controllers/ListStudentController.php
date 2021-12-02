<?php

namespace App\Http\Controllers;
use App\ListStudent;
use Illuminate\Http\Request;
use Validator;

class ListStudentController extends Controller
{
    public function index(){
        return ListStudent::with('course')->with('student')->where('status','=','1')->get();
    }

    public function index_false(){
        return ListStudent::with('course')->with('student')->where('status','=','0')->get();
    } 
    public function count(){
        return ListStudent::where('status','=','0')->count();

    }


    public function create(Request $request){
        $rule=[
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        // $list_student=ListStudent::where('name',$request['name'])->first();
        // if($list_student){
        //     $response['status']=0;
        //     $response['message']='Name Already Exists';
        //     $response['code']=409; 
        //     return response()->json($response);
        // }
            $list_student=ListStudent::create([
                'student_id'=>$request->student_id,
                'course_id'=>$request->course_id,
                // 'status'=>$request->status,

            ]);   
            $response['status']=1;
            $response['message']='Create Name Successfully';
            $response['code']=200;
            return response()->json($response); 
    }
    public function swap($id){
        try{
            $list_student=ListStudent::find($id);
            $list_student->status=!$list_student->status;
            $list_student->save();
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
    public function findStudenByCourse($id){
        $listStudent=ListStudent::where('course_id','=',$id)->where('status','=','1')->with('student')->get();
        return $listStudent;
    }
    public function checkStudent(Request $request){
        $listStudent=ListStudent::where('course_id','=',$request->course_id)->where('student_id','=',$request->student_id)->get();
        return $listStudent;
    }
    
}

