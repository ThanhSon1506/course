<?php

namespace App\Http\Controllers;
use App\Category;
use Illuminate\Http\Request;
use Validator;
class CategoryController extends Controller
{
    public function index(){
        return Category::all();
    }

    
    public function create(Request $request){
        $rule=['name'=>'required|min:3|max:20|unique:categories',
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $category=Category::where('name',$request['name'])->first();
        if($category){
            $response['status']=0;
            $response['message']='Name Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $category=Category::create([
                'name'=>$request->name
            ]);   
            $response['status']=1;
            $response['message']='Create Name Successfully';
            $response['code']=200;
            return response()->json($response); 
    }



    public function update(Request $request,$id){
        $rule=['name'=>'required|min:3|max:20|unique:categories',
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
    $category=Category::find($id);
    if(!$category){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $category->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $category->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $category=Category::find($id);
        if(is_null($category)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $category->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
}
