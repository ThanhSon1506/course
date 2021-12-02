<?php

namespace App\Http\Controllers;
use App\Comment;
use Illuminate\Http\Request;
use Validator;

class CommentController extends Controller
{
    public function index($id){
        $comment=Comment::with('account')->Where('course_id','=',$id)->get();
        return $comment;
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
             $comment=Comment::create([
                'account_id'=>$request->account_id,
                'course_id'=>$request->course_id,
                'rate'=>$request->rate,
                'message'=>$request->message,
            ]);   
            $response['status']=1;
            $response['message']='Create comments Successfully';
            $response['code']=200;
            return response()->json($response); 

}
}
