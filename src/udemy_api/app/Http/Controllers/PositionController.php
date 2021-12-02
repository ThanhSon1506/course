<?php

namespace App\Http\Controllers;
use App\Position;
use Illuminate\Http\Request;
use Validator;
class PositionController extends Controller
{
    public function index(){
        return Position::all();
    }

    
    public function create(Request $request){
        $rule=['name'=>'required|min:3|max:20|unique:positions',
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $position=Position::where('name',$request['name'])->first();
        if($position){
            $response['status']=0;
            $response['message']='Name Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $position=Position::create([
                'name'=>$request->name
            ]);   
            $response['status']=1;
            $response['message']='Create Name Successfully';
            $response['code']=200;
            return response()->json($response); 
    }



    public function update(Request $request,$id){
        $rule=['name'=>'required|min:3|max:20|unique:positions',
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
    $position=Position::find($id);
    if(!$position){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $position->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $position->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $position=Position::find($id);
        if(is_null($position)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $position->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }

}