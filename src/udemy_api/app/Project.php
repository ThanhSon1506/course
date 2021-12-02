<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table="projects";
    protected $fillable = [
        'course_id','teacher_id','video_id','name','start_date','end_date'
    ];
    public function course(){
        return $this->belongsTo('App\Course','course_id');
    }
    public function teacher(){
        return $this->belongsTo('App\Teacher','teacher_id');
    } 
    public function video(){
        return $this->belongsTo('App\Video','video_id');
    }

}
