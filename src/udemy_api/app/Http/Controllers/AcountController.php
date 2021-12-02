<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Acount;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTExceptions;
// header("Access-Control-Allow-Origin: http://localhost:4200");
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
class AcountController extends Controller
{
    
    public function register(Request $request){

        $acount=Acount::where('username',$request['username'])->first();
        if($acount){
            $response['status']=0;
            $response['message']='Username Already Exists';
            $response['code']=409; 
        }else{
            $acount=Acount::create([
                'username'=>$request->username,
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
        $acount=auth()->acount();
        $data['token']=auth()->claims(
            [
                'id'=>$acount->id,
                'username'=>$acount->username
            ]
        )->attempt($credentials);

        $response['data']=$data;
        $response['status']=1;
        $response['code']=200;
        $response['message']='Login Successfully';
        return response()->json($response);
    }
    public function index(){
        return Acount::all();
    }
}