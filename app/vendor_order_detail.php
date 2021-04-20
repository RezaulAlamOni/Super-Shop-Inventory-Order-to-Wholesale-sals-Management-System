<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vendor_order_detail extends Model
{
    //

    protected $primaryKey = 'vendor_order_detail_id';
    protected $with = ['vendor_item'];

    public function vendor_item(){
         return $this->hasOne(vendor_item::class,'vendor_item_id','vendor_item_id');
    }
}
