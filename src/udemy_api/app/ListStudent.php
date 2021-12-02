<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ListStudent extends Model
{
    protected $table="list_students";
    protected $fillable = [
        'id','student_id','course_id','status'
    ];
    public function student(){
        return $this->belongsTo('App\Student','student_id');
      }
      public function course(){
        return $this->belongsTo('App\Course','course_id');
      }
}
