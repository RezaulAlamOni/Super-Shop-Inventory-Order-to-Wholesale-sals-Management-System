<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;
use App\customer;
use App\customer_shop;
use App\vendor;
use App\users_details;
use Auth;
class User extends Authenticatable
{
    use Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','device_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    // public function getFirstNameAttribute()
    public function getImageAttribute()
    {
        $user_id= Auth::user()->id;
        $user_details = users_details::where('users_id', $user_id)->first();
        if($user_details){
            $image_name = $user_details->image;
        } else {
            $image_name = null;
        }
        return $image_name;
    }
    public function getShopIdAttribute()
    {
        $user_id= Auth::user()->id;
        $user_details = customer_shop::where('user_id', $user_id)->first();
        if($user_details){
            $shop_id = $user_details->customer_shop_id;
        } else {
            $shop_id = null;
        }
        return $shop_id;
    }
    public function getCustomerIdAttribute()
    {
        $user_id= Auth::user()->id;
        $user_details = customer_shop::where('user_id', $user_id)->first();
        if($user_details){
            $customer_id = $user_details->customer_id;
        } else {
            $customer_id = null;
        }
        return $customer_id;
    }
    
    public function customer(){
        return $this->hasOne(customer::class);
    }
    public function vendor(){
        return $this->hasOne(vendor::class);
    }
}
