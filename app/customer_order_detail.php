<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\jan;
use App\vendor_item;
use App\customer_item;
use App\customer_order;
use App\customer_shipment;
class customer_order_detail extends Model
{
    public function jan()
    {
        return $this->belongsTo(jan::class, 'jan','jan');
    }
   
    public function vendor_item()
    {
        return $this->belongsTo(vendor_item::class, 'jan','jan');
    }
    public function customer_order()
    {
        return $this->belongsTo(customer_order::class, 'customer_order_id','customer_order_id');
    }
    public function customer_shipment()
    {
        return $this->belongsTo(customer_shipment::class, 'customer_order_detail_id','customer_order_detail_id');
    }
}
