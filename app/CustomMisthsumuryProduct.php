<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomMisthsumuryProduct extends Model
{
    //
    protected $guarded = [];


    protected function getCreatedAtAttribute($value)
    {
        return date('d-M-Y', strtotime($value));
    }


}
