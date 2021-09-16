<?php

use Illuminate\Database\Seeder;
use App\customer;
class customerSeeder extends Seeder
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
                'name' => 'A スーパー',
                'partner_code' => '123456',
                'phone' =>'01936755674',
                'user_id'=>4,
            ],
            [
                'name' => 'B スーパー',
                'partner_code' => '65321',
                'phone' =>'01936755674',
                'user_id'=>5,
            ],
            [
                'name' => 'ジャコス',
                'partner_code' => '987987',
                'phone' =>'1234567',
                'user_id'=>6,
            ]
        );

        customer::insert($user_array);
    }
}
