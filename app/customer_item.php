<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\jan;

class customer_item extends Model
{
    //
    public function jan()
    {
        return $this->belongsTo(jan::class, 'jan','jan');
    }
    public function janinfo(){
        return $this->hasOne(jan::class,'jan','jan');
    }
}
