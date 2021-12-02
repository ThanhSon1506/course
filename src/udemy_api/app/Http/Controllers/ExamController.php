<?php

namespace App\Http\Controllers;
use App\Exam;
use Illuminate\Http\Request;
use Validator;

class ExamController extends Controller
{
    public function index(){
        return Exam::with('session')->with('teacher')->get();
    }

    
    public function create(Request $request){
        $rule=['name'=>'required|min:3|unique:exams',
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $exam=Exam::where('name',$request['name'])->first();
        if($exam){
            $response['status']=0;
            $response['message']='Name Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $exam=Exam::create([
                'name'=>$request->name,
                'teacher_id'=>$request->teacher_id,
                'session_id'=>$request->session_id,
                'request_percent'=>$request->request_percent,
                'deadline'=>$request->deadline,
                'question_sum'=>$request->question_sum,
            ]);   
            $response['status']=1;
            $response['message']='Create Exams Successfully';
            $response['code']=200;
            return response()->json($response); 
    }



    public function update(Request $request,$id){
        $rule=['name'=>'required|min:3|max:20|unique:exams',
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
    $exam=Exam::find($id);
    if(!$exam){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $exam->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $exam->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $exam=Exam::find($id);
        if(is_null($exam)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $exam->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
    public function findExam(Request $request){
        $exam=Exam::where('name','=',$request->name)->where('teacher_id','=',$request->teacher_id)->get();
        return $exam;

    }

    public function findQuestionByExam($id){
        $exam=Exam::where('session_id','=',$id)->get();
        return $exam;
    }    

    public function readExam($id){
        $exam=Exam::whereId($id)->get();
        return $exam;
    }
}
