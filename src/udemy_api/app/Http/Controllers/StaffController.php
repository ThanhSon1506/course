<?php

namespace App\Http\Controllers;
use App\Staff;
use Illuminate\Http\Request;
use Validator;

class StaffController extends Controller
{
    public function index()
    {
        $staff=Staff::all();
        return $staff;
    }
    public function create(Request $request){
        $rule=['lastname'=>'required|min:3|max:20',
                'firstname'=>'required|min:3|max:20',
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $phone=Staff::where('phone',$request['phone'])->first();
        if($phone){
            $response['status']=0;
            $response['message']='Phone Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $staff=Staff::create([
                'firstname'=>$request->firstname,
                'lastname'=>$request->lastname,
                'position'=>$request->position,
                'account_id'=>$request->account_id,
                'date'=>$request->date,
                'phone'=>$request->phone,
                'address'=>$request->address,
                'zip_code'=>$request->zip_code,
            ]);   
            $response['status']=1;
            $response['message']='Create staff Successfully';
            $response['code']=200;
            return response()->json($response); 
    }

    public function update(Request $request,$id){
        $rule=['lastname'=>'required|min:3|max:20',
        'firstname'=>'required|min:3|max:20',
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
        $response['message']='Could Not Find Staff';
        $response['code']=409; 
        return response()->json($response);
    }
    $staff=Staff::find($id);
    if(!$staff){
        $response['status']=0;
        $response['message']='Could Not Find Staff';
        $response['code']=409; 
        return response()->json($response);
    }
    $staff->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $staff->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $staff=Staff::find($id);
        if(is_null($staff)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $staff->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
}
