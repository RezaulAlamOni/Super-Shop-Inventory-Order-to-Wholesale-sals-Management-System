<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vendor_arrival extends Model
{
    //
    protected $with = ['vendor_order_details'];

    public function vendor_order_details()
    {
        return $this->hasOne(vendor_order_detail::class, 'vendor_order_detail_id', 'vendor_order_detail_id');
    }
}
