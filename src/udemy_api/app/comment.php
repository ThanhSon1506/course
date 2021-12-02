<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class comment extends Model
{
    protected $table="comments";
    protected $fillable = [
        'account_id','course_id','rate','message',
    ];
    public function account(){
        return $this->belongsTo('App\User','account_id');
    }
    public function course(){
        return $this->belongsTo('App\Course','course_id');
    }
}
