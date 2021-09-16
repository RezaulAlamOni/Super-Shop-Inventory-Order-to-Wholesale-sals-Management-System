<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\users_details;
use App\jan;
use App\customer;

class estimate_item extends Model
{
    //
    public function janinfo(){
        return $this->hasOne(jan::class,'jan','jan');
    }
    public function customer(){
        return $this->belongsTo(customer::class,'customer_id','customer_id');
    }
}
