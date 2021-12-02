<?php

namespace App\Http\Controllers;
use App\Video;
use Illuminate\Http\Request;
use Validator;

class VideoController extends Controller
{   
    public function index(){
        return Video::with('session')->get();
    }


    public function create(Request $request){
        $video = new Video;
        $rule=[
            'url'=>'required|max:8000000|mimes:mp4|file',

            
            ];
        
        $validator=Validator::make($request->all(),$rule);
       
        // if($exits){
        //     $response['status']=0;
        //     $response['message']='Video Already Exists';
        //     $response['code']=409; 
        //     return response()->json($response);   
        // }
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
            return response()->json($response);
        }
        
        if($request->hasFile('url')){
            $completeFileName=$request->file('url')->getClientOriginalName();
            $fileNameOnly=pathinfo($completeFileName,PATHINFO_FILENAME);
            $extenshion=$request->file('url')->getClientOriginalExtension();
            $compUrl=str_replace('','',$fileNameOnly).'-'.rand().'-'.time().'.'.$extenshion;
            $path=$request->file('url')->storeAs('public/videos',$compUrl);
            $video->url=$compUrl; 
        }
        $video->title=$request->title;
        $video->description=$request->description;
        $video->session_id=$request->session_id;
        if($video->save()){
            $response['status']=1;
            $response['message']="Create Succeessfully";
            $response['code']=200;
            return response()->json($response);
        }
        if(!$video->save()){
            $response['status']=0;
            $response['message']='Create Failure';
            $response['code']=409; 
            return response()->json($response);    
        }
    
     }
     


     public function createVideo(Request $request){
        $video = new Video;
        $rule=[
            'url'=>'required|max:8000000|mimes:mp4|file',
            
            ];
        
        $validator=Validator::make($request->all(),$rule);
       
        // if($exits){
        //     $response['status']=0;
        //     $response['message']='Video Already Exists';
        //     $response['code']=409; 
        //     return response()->json($response);   
        // }
        if($validator->fails()){
            $response['status']=0;
            $response['message']=$validator->errors()->first();
            $response['code']=400; 
            return response()->json($response);
        }
        
        if($request->hasFile('url')){
            $completeFileName=$request->file('url')->getClientOriginalName();
            $fileNameOnly=pathinfo($completeFileName,PATHINFO_FILENAME);
            $extenshion=$request->file('url')->getClientOriginalExtension();
            $compUrl=str_replace('','',$fileNameOnly).'-'.rand().'-'.time().'.'.$extenshion;
            $path=$request->file('url')->storeAs('public/videos',$compUrl);
            $video->url=$compUrl; 
        }
        $video->title=$request->title;
        $video->description=$request->description;
        $video->session_id=$request->session_id;
        if($video->save()){
            $response['status']=1;
            $response['message']="Update Succeessfully";
            $response['code']=200;
            return response()->json($response);
        }
        if(!$video->save()){
            $response['status']=0;
            $response['message']='Update Failure';
            $response['code']=409; 
            return response()->json($response);    
        }
    
     }



    public function update(Request $request,$id){
        $rule=['title'=>'required|min:3|max:20|unique:videos',
                'description'=>'min:3|max:50',
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
    $video=Video::find($id);
    if(!$video){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $video->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $video->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $video=Video::find($id);
        if(is_null($video)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $video->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }
    

    public function findVideoByTheme($id){

        $lesson = Video::with('session')->where('session_id', '=', $id)->get();
        $count = Video::with('session')->where('session_id', '=', $id)->get()->count();
        if($count==0){
            $response['status']=0;
            $response['message']='The database data is empty.';
            $response['code']=409; 
            return response()->json($response);
        }
        if(is_null($id)){
            $response['status']=0;
            $response['message']='Could Not Find Lesson';
            $response['code']=409; 
            return response()->json($response);
        }
            
        if(!$lesson){
            $response['status']=0;
            $response['message']='Could Not Find Lesson';
            $response['code']=409; 
            return response()->json($response);
        }
        return $lesson;
    
    }

    public function destroySession($id){
        $lesson = Video::with('session')->where('session_id','=', $id)->get();
        $count=Video::with('session')->where('session_id','=',$id)->count();
       
        if(is_null($lesson)){
            $response['status']=0;
            $response['message']="Lesson Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        if($count==0){
            $response['status']=0;
            $response['message']="There are no more accounts";
            $response['code']=404; 
            return response()->json($response);
        }
       foreach($lesson as $e){
           $e->delete();
       }
        $response['status']=1;
        $response['message']="Delete all Succeessfully";
        $response['code']=200;

        return response()->json($response);
}   
    
}
