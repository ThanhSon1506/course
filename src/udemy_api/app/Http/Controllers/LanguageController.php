<?php

namespace App\Http\Controllers;
use App\Language;
use Validator;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function index(){
        return Language::all();
    }

    
    public function create(Request $request){
        $rule=['name'=>'required|min:3|max:20|unique:languages',
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $language=Language::where('name',$request['name'])->first();
        if($language){
            $response['status']=0;
            $response['message']='Name Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $language=Language::create([
                'name'=>$request->name
            ]);   
            $response['status']=1;
            $response['message']='Create Name Successfully';
            $response['code']=200;
            return response()->json($response); 
    }



    public function update(Request $request,$id){
        $rule=['name'=>'required|min:3|max:20|unique:languages',
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
    $language=Language::find($id);
    if(!$language){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $language->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $language->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $language=Language::find($id);
        if(is_null($language)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $language->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
}
