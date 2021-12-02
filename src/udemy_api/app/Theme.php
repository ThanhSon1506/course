<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{   
    protected $table="themes";
    protected $fillable = [
        'name','course_id'
    ];
    public function course(){
        return $this->belongsTo('App\Course','course_id');
    }
    public function lesson(){
        return $this->hasmany('App\Video');
    }
}
