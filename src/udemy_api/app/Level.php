<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $table="levels";
    protected $fillable = [
        'name',
    ];
    public function course(){
        return $this->hasmany('App\Course');
    }
}
