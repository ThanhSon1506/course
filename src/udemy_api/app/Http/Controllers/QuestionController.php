<?php

namespace App\Http\Controllers;
use Validator;
use App\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index(){
        return Question::all();
    }

    
    public function create(Request $request){
        $rule=['question'=>'required|min:3|unique:questions',
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $question=Question::where('question',$request['question'])->first();
        if($question){
            $response['status']=0;
            $response['message']='Question Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $question=Question::create([
                'exam_id'=>$request->exam_id,
                'question'=>$request->question,
                'answer_A'=>$request->answer_A,
                'answer_B'=>$request->answer_B,
                'answer_C'=>$request->answer_C,
                'answer_D'=>$request->answer_D,
                'answer_correct'=>$request->answer_correct,
            ]);   
            $response['status']=1;
            $response['message']='Create Question Successfully';
            $response['code']=200;
            return response()->json($response); 
    }



    public function update(Request $request,$id){
        $rule=['question'=>'required|min:3|max:20|unique:questions',
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
    $question=Question::find($id);
    if(!$question){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $question->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $question->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $question=Question::find($id);
        if(is_null($question)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $question->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }

    public function readQuestion($id){
        $question=Question::where('exam_id','=',$id)->get();
        return $question;
    }
}
