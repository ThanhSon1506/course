<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use App\Student;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTExceptions;
use Validator;
class UserController extends Controller
{
    public function register(Request $request){
        $rule=['username'=>'required|min:5|max:20',
        'email'=>'email|required|unique:users|regex:/(.*)@gmail\.com/i',    
        'is_active'=>'required',
        'type_id'=>'required',
];
        $validator=Validator::make($request->all(),$rule);
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
        return response()->json($response);
}
        $user=User::where('email',$request['email'])->first();
        if($user){
            $response['status']=0;
            $response['message']='Email Already Exists';
            $response['code']=409; 
        }else{
            $user=User::create([
                'username'=>$request->username,
                'email'=>$request->email,
                'password'=>bcrypt($request->password),
                'type_id'=>$request->type_id,
                'is_active'=>$request->is_active
            ]);   
            $response['status']=1;
            $response['message']='Create User Successfully';
            $response['code']=200;
        }
      
        return response()->json($response);
    }

    public function login(Request $request){
        $credentials=$request->only('email','password');
        try{
            if(!JWTAuth::attempt($credentials)){
                $response['status']=0;
                $response['code']=401;
                $response['data']=null;
                $response['message']='Email or Password is incorrect';
                return response()->json($response);

            }
        }catch(JWTException $e){
            $response['data']=null;
            $response['code']=500;
            $response['message']='Could Not Created Token';
            return response()->json($response);

        }
        $user=auth()->user();
        $data['token']=auth()->claims(
            [
                'id'=>$user->id,
                'email'=>$user->email,
                'username'=>$user->username,
                'is_active'=>$user->is_active,
                'type_id'=>$user->type_id,
            ]
        )->attempt($credentials);

        $response['data']=$data;
        $response['status']=1;
        $response['code']=200;
        $response['message']='Login Successfully';
        return response()->json($response);
    }
    public function index(){
        $model = User::with('position')->get();
        return $model;
    }
    public function swap(Request $request){
        $user=User::where('id',$request['id'])->first();
        if(!$user){
            $response['status']=0;
            $response['message']='Could Not Find User';
            $response['code']=409; 
        }else{
            $user->is_active=!$user->is_active;
            
            if($user->is_active==0){
                $response['status']=1;
                $response['message']='Delete Successfully';
                $response['code']=200; 
            }else{
                $response['status']=1;
                $response['message']='Restore Successfully';
                $response['code']=200; 
            }
            $user->save();
            
        }
        return response()->json($response);
    }


     public function delete($id){
        $user=User::find($id);
        if(is_null($user)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $user->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }

    public function update(Request $request,$id){
        $rule=['username'=>'required|min:5|max:20',
                'email'=>'email|required|unique:users|regex:/(.*)@gmail\.com/i',    
                'is_active'=>'required',
                'type_id'=>'required',
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
            $response['message']='Could Not Find User';
            $response['code']=409; 
            return response()->json($response);
        }
        $user=User::find($id);
        if(!$user){
            $response['status']=0;
            $response['message']='Could Not Find User';
            $response['code']=409; 
            return response()->json($response);
        }
        $user->update($request->all());
                $response['status']=1;
                $response['message']='Update Successfully';
                $response['code']=200;
            $user->save();
            
        return response()->json($response);
    }

    public function findUserPosition($id){
        $user = User::with('position')->where('type_id', '=', $id)->get();
        $count = User::with('position')->where('type_id', '=', $id)->get()->count();
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
            
        if(!$user){
            $response['status']=0;
            $response['message']='Could Not Find User';
            $response['code']=409; 
            return response()->json($response);
        }
        return $user;
    }

    public function destroy($id){
            $user = User::with('position')->where('type_id','=', $id)->get();
            $count = User::with('position')->where('type_id','=',$id)->count();
            if(is_null($user)){
                $response['status']=0;
                $response['message']="User Not Found";
                $response['code']=404; 
                return response()->json($response);
            }
            if($count==0){
                $response['status']=0;
                $response['message']="There are no more accounts";
                $response['code']=404; 
                return response()->json($response);
            }
           foreach($user as $e){
               $e->delete();
           }
            $response['status']=1;
            $response['message']="Delete all Succeessfully";
            $response['code']=200;

            return response()->json($response);

    }

}