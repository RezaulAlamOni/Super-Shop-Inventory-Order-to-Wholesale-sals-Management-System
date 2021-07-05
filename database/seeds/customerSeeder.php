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
                'phone' =>'01936755674'
            ],
            [
                'name' => 'B スーパー',
                'partner_code' => '65321',
                'phone' =>'01936755674'
            ]
        );

        customer::insert($user_array);
    }
}
