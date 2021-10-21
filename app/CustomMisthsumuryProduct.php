<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomMisthsumuryProduct extends Model
{
    //
    protected $guarded = [];

    protected $appends = ['image_url'];

    protected function getImageAttribute($val)
    {
        return 'public/storage/'.$val;
    }
    protected function getImageUrlAttribute()
    {
        return '/rv3_tonyav1/'.$this->image;
    }

}
