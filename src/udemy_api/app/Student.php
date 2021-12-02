<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table="students";
    protected $fillable = [
        'firstname','lastname','account_id','phone',
        'address','date','zipcode','status'
    ];
    public function account(){
        return $this->belongsTo('App\User','account_id');
    }
    public function list_student(){
        return $this->hasmany('App\ListStudent');
    }

}
