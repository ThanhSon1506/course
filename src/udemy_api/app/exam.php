<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class exam extends Model
{
    protected $table="exams";
    protected $fillable = [
        'id','teacher_id','session_id','name','question_sum','request_percent','deadline'
    ];

    public function teacher(){
        return $this->belongsTo('App\Teacher','teacher_id');
    } 
    public function session(){
        return $this->belongsTo('App\Theme','session_id');
    }
}
