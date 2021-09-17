<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\estimate_item;
use App\User;

class customer extends Model
{
    //
    public function estimate_items(){
        return $this->hasMany(estimate_item::class,'customer_id','customer_id');
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
