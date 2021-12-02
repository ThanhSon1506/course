<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table="teachers";
    protected $fillable = [
        'firstname','lastname','account_id','phone',
        'date','literacy','status'
    ];
    public function account(){
        return $this->belongsTo('App\User','account_id');
    }
    public function project(){
        return $this->hasmany('App\Project');
    }
    public function course(){
        return $this->hasmany('App\Course');
    }
}
