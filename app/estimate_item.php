<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class estimate_item extends Model
{
    //
    public function janinfo(){
        return $this->hasOne(jan::class,'jan','jan');
    }
}
