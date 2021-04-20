<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vendor_payment extends Model
{
    protected $fillable = [
        'vendor_invoice_id',
        'vendor_id',
        'payment',
        'payment_date'
    ];

}
