<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\estimate_item;

class customer extends Model
{
    //
    public function estimate_items(){
        return $this->hasMany(estimate_item::class,'customer_id','customer_id');
    }
}
