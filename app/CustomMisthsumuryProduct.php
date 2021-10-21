<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomMisthsumuryProduct extends Model
{
    //
    protected $guarded = [];

    protected function getImageAttribute($val)
    {
        return 'public/storage/backend/images/mistumury/'.$val;
    }

}
