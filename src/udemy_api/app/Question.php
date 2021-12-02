<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table="questions";
    protected $fillable = [
       'id','exam_id','question','answer_A','answer_B','answer_C','answer_D','answer_correct'
    ];
    public function exam(){
        return $this->belongsTo('App\Exam','exam_id');
    }
}
