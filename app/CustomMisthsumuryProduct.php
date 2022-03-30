<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomMisthsumuryProduct extends Model
{
    //
    protected $guarded = [];


    protected function getCreatedAtAttribute($value)
    {
        return date('Y-m-d', strtotime($value));
    }

    public function vendor_item()
    {
        return $this->hasOne(vendor_item::class,'jan','jan');
    }


}
