<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table="staffs";
    protected $fillable = [
        'firstname','lastname','account_id','phone',
        'address','position','status'
    ];
    public function account(){
        return $this->belongsTo('App\User','account_id');
    }
}
