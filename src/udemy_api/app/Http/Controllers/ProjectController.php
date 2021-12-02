<?php

namespace App\Http\Controllers;
use App\Project;
use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\DB;

class ProjectController extends Controller
{
    public function index(){
        return Project::all();
    }
    //  public function getIndex($teacher_id,Request $request){
    //     $project=Project::whereExists(function($query){
    //         $query->select(DB::raw(1))
    //             ->from('project')
    //             ->whereRaw('project.teacher_id = $teacher_id and project.course_id = $request->course_id');
    //     })->frist();
    //     return $project;
    //  }
    
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
        $project=Project::where('name',$request['name'])->first();
        if($project){
            $response['status']=0;
            $response['message']='Name Already Exists';
            $response['code']=409; 
            return response()->json($response);
        }
            $project=Project::create([
                'course_id'=>$request->course_id,
                'teacher_id'=>$request->teacher_id,
                'video_id'=>$request->video_id,
                'name'=>$request->name,
                'start_date'=>$request->start_date,
                'end_date'=>$request->end_date
            ]);   
            $response['status']=1;
            $response['message']='Create Successfully';
            $response['code']=200;
            return response()->json($response); 
    }



    public function update(Request $request,$id){
        $rule=[
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
    $project=Project::find($id);
    if(!$project){
        $response['status']=0;
        $response['message']='Could Not Find Data';
        $response['code']=409; 
        return response()->json($response);
    }
    $project->update($request->all());
            $response['status']=1;
            $response['message']='Update Successfully';
            $response['code']=200;
            $project->save(); 
    return response()->json($response);
    }  

    public function delete($id){
        $project=Project::find($id);
        if(is_null($project)){
            $response['status']=0;
            $response['message']="User Not Found";
            $response['code']=404; 
            return response()->json($response);
        }
        $project->delete();
        $response['status']=1;
        $response['message']="Delete Successfully";
        $response['code']=200;
        return response()->json($response);
    }

}
