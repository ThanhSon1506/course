<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Teacher;
use App\User;
class TeacherController extends Controller
{
    public function index()
    {
        $teacher=Teacher::with('account')->get();
        return $teacher;
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
        $phone=Teacher::where('phone',$request['phone'])->first();
        if($phone){
            $response['status']=0;
            $response['message']='Phone Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $teacher=Teacher::create([
                'firstname'=>$request->firstname,
                'lastname'=>$request->lastname,
                'account_id'=>$request->account_id,
                'date'=>$request->date,
                'phone'=>$request->phone,

                'address'=>$request->address,
                'literacy'=>$request->literacy,
                'zip_code'=>$request->zip_code,
            ]);   
            $response['status']=1;
            $response['message']='Create teacher Successfully';
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
        $response['message']='Could Not Find Teacher';
        $response['code']=409; 
        return response()->json($response);
    }
    $teacher=Teacher::find($id);
    if(!$teacher){
        $response['status']=0;
        $response['message']='Could Not Find Teacher';
        $response['code']=409; 
        return response()->json($response);
    }
    $teacher->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $teacher->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $teacher=Teacher::find($id);
        if(is_null($teacher)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $teacher->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
    public function sameTeacherAccount(){
        $array_1=[];
        $array_2=[];
        $array_3=[];
        $array_4=[];
        $new=[];
        $teacher=Teacher::with('account')->get();
        $user=User::all();
            foreach($teacher as $s){          
                $array_1[]=$s->account_id;   
            }

            foreach($user as $e){ 
                $array_2[]=$e->id;
            }
            $new=array_diff($array_2,$array_1);    
            foreach($new as $e){ 
                $teacher=User::find($e);
                $array_3[]=$teacher;
            }
            foreach($array_3 as $e){ 
                if($e->type_id==2){
                    $array_4[]=$e;
                }
            }
        return $array_4;
    }

    public function findTeacherAccount($id){
        $teacher =Teacher::with('account')->where('account_id','=',$id)->get();
        $count =Teacher::where('account_id','=',$id)->count();
        if($count==0){
            $response['status']=0;
            $response['message']='The database data is empty.';
            $response['code']=409; 
            return response()->json($response);
        }

        if(is_null($id)){
            $response['status']=0;
            $response['message']='Could Not Find User';
            $response['code']=409; 
            return response()->json($response);
        }

        if(!$teacher){
            $response['status']=0;
            $response['message']='Could Not Find User';
            $response['code']=409; 
            return response()->json($response);
        }
        return $teacher;
    }


    
}
