<?php

use Illuminate\Database\Seeder;
use App\vendor;
class vendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_array=array(
            [
                'name' => 'A 問屋',
                'partner_code' => '123456',
                'phone' =>'123456789',
                'user_id'=>3
            ],
            [
                'name' => 'B 問屋',
                'partner_code' => '654321',
                'phone' =>'987654321',
                'user_id'=>7
            ],
            [
                'name' => 'C 問屋',
                'partner_code' => '321654',
                'phone' =>'123456798',
                'user_id'=>8
            ]
        );

        vendor::insert($user_array);
    }
}
