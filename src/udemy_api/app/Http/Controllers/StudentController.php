<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Student;
use App\User;
use Validator;

class StudentController extends Controller
{
    public function index()
    {
        $student=Student::with('account')->get();
        return $student;
    }
    public function create(Request $request){
        $rule=['lastname'=>'required|min:3|max:20',
                'firstname'=>'required|min:3|max:20',
                'account_id'=>'required|unique:students',
                ];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $phone=Student::where('phone',$request['phone'])->first();
        if($phone){
            $response['status']=0;
            $response['message']='Phone Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $student=Student::create([
                'firstname'=>$request->firstname,
                'lastname'=>$request->lastname,
                'account_id'=>$request->account_id,
                'date'=>$request->date,
                'phone'=>$request->phone,
                'address'=>$request->address,
                   'zip_code'=>$request->zip_code,
            ]);   
            $response['status']=1;
            $response['message']='Create Student Successfully';
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
        $response['message']='Could Not Find Student';
        $response['code']=409; 
        return response()->json($response);
    }
    $student=Student::find($id);
    if(!$student){
        $response['status']=0;
        $response['message']='Could Not Find Student';
        $response['code']=409; 
        return response()->json($response);
    }
    $student->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $student->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $student=Student::find($id);
        if(is_null($student)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $student->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
    public function sameStudentAccount(){
        $array_1=[];
        $array_2=[];
        $array_3=[];
        $array_4=[];
        $new=[];
        $student=Student::with('account')->get();
        $user=User::all();
            foreach($student as $s){          
                $array_1[]=$s->account_id;   
            }

            foreach($user as $e){ 
                $array_2[]=$e->id;
            }
            $new=array_diff($array_2,$array_1);    
            foreach($new as $e){ 
                $user=User::find($e);
                $array_3[]=$user;
            }
            foreach($array_3 as $e){ 
                if($e->type_id==1){
                    $array_4[]=$e;
                }
            }
        return $array_4;
    }
    public function findStudentAccount($id){
        $student =Student::with('account')->where('account_id','=',$id)->get();
        $count =Student::where('account_id','=',$id)->count();
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

        if(!$student){
            $response['status']=0;
            $response['message']='Could Not Find User';
            $response['code']=409; 
            return response()->json(response);
        }
        return $student;
    }


}
