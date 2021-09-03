<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vendor_item extends Model
{
    //

    protected $primaryKey = 'vendor_item_id';

    public function janinfo(){
        return $this->hasOne(jan::class,'jan','jan');
    }

}
