<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $table="positions";
    protected $fillable = [
        'name',
    ];
    public function user(){
        return $this->hasmany('App\User');
    }
}