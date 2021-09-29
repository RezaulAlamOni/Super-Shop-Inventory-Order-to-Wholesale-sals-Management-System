<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class customer_payment extends Model
{
    protected $fillable = [
        'customer_id',
        'customer_invoice_id',
        'payment',
        'payment_date'
    ];
}
