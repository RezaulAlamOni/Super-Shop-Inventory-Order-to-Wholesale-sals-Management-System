<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class customer_due_blance extends Model
{
    protected $fillable = [
        'customer_id',
        'opening_due_amount',
        'payment_due_amount',
        'orginal_due_amount'
    ];
}
