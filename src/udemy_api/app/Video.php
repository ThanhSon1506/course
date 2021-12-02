<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table="videos";
    protected $fillable = [
      'id','title','description','url','session_id'
    ];
    public function project(){
      return $this->hasmany('App\Project');
  }
    public function session(){
      return $this->belongsTo('App\Theme','session_id');
    }

}
