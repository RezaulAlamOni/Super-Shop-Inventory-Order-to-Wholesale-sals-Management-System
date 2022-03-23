<?php
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\User;
use App\users_details;

class UsersTableSeeder extends Seeder
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
                'name' => 'Jacos Super Admin',
                'user_type'=>'super_admin',
                'email' => 'super_admin@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],
            [
                'name' => 'Jacos Admin',
                'user_type'=>'admin',
                'email' => 'admin@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],
            [
                'name' => 'Tonya User',
                'user_type'=>'tonya',
                'email' => 'user@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],[
                'name' => 'Super User',
                'user_type'=>'super',
                'email' => 'jacos1@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],[
                'name' => 'Super User',
                'user_type'=>'super',
                'email' => 'jacos2@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ]
            ,[
                'name' => 'Super User',
                'user_type'=>'super',
                'email' => 'jacos3@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],
            [
                'name' => 'Tonya User',
                'user_type'=>'tonya',
                'email' => 'tonya2@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],[
                'name' => 'Tonya User',
                'user_type'=>'tonya',
                'email' => 'tonya3@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],
            [
                'name' => 'Shop User',
                'user_type'=>'shop',
                'email' => 'shop_a@jacos.co.jp',
                'password' => bcrypt('123456')
            ],
            [
                'name' => 'Shop User',
                'user_type'=>'shop',
                'email' => 'shop_b@jacos.co.jp',
                'password' => bcrypt('654321')
            ],
            [
                'name' => 'Shop User',
                'user_type'=>'shop',
                'email' => 'shop_c@jacos.co.jp',
                'password' => bcrypt('333222')
            ],
            [
                'name' => 'Shop User',
                'user_type'=>'shop',
                'email' => 'shop_d@jacos.co.jp',
                'password' => bcrypt('222333')
            ],
        );

        $user_details_array=array(
            ['users_id'=>1],
            ['users_id'=>2],
            ['users_id'=>3],
            ['users_id'=>4],
            ['users_id'=>5],
            ['users_id'=>6],
            ['users_id'=>7],
            ['users_id'=>8],
        );
        User::insert($user_array);
        users_details::insert($user_details_array);
        
    }
}
