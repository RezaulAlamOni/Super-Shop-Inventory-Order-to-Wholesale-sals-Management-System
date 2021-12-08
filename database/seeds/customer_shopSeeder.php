<?php

use Illuminate\Database\Seeder;
use App\customer_shop;
class customer_shopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $shop_array=array(
            [
                'shop_no' => '123456',
                'customer_id' => '1',
                'user_id' => '9',
                'shop_name' =>'店 A',
                'shop_address' =>'Tokyo',
                'shop_postal_code' =>'2233',
                'phone' =>'01936755674',
                'email' =>'shop_a@gmail.com',
                'delivery_cycle' =>'1'
            ],
            [
                'shop_no' => '654321',
                'customer_id' => '1',
                'user_id' => '10',
                'shop_name' =>'店 B',
                'shop_address' =>'Tokyo',
                'shop_postal_code' =>'2233',
                'phone' =>'01936755674',
                'email' =>'shop_b@gmail.com',
                'delivery_cycle' =>'1'
            ],[
                'shop_no' => '333222',
                'customer_id' => '2',
                'user_id' => '11',
                'shop_name' =>'店 A',
                'shop_address' =>'Tokyo',
                'shop_postal_code' =>'2233',
                'phone' =>'01936755674',
                'email' =>'shop_c@gmail.com',
                'delivery_cycle' =>'1'
            ],
            [
                'shop_no' => '222333',
                'customer_id' => '2',
                'user_id' => '12',
                'shop_name' =>'店 B',
                'shop_address' =>'Tokyo',
                'shop_postal_code' =>'2233',
                'phone' =>'01936755674',
                'email' =>'shop_d@gmail.com',
                'delivery_cycle' =>'1'
            ]
        );

        customer_shop::insert($shop_array);
    }
}
