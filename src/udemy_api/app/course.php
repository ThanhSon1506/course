<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class course extends Model
{
    protected $table="courses";
    protected $fillable = [
        'name','category_id','level_id','language_id','photo','price','status','teacher_id'
    ];
    public function language(){
        return $this->belongsTo('App\Language','language_id');
    }
    public function level(){
        return $this->belongsTo('App\Level','level_id');
    } 
    public function category(){
        return $this->belongsTo('App\Category','category_id');
    }
    public function teacher(){
        return $this->belongsTo('App\Teacher','teacher_id');
    }
    public function theme(){
        return $this->hasmany('App\Theme');
    }  
    public function list_student(){
        return $this->hasmany('App\ListStudent');
    }

    // public function recent($limit = 5){
    //     return $this->posts
    //         ->sortByDesc(function ($post){
    //             return $post->created_at;
    //         })->take($limit);
    //     }

}
