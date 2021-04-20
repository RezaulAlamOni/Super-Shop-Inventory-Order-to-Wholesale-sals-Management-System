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
                'email' => 'super_admin@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],
            [
                'name' => 'Jacos Admin',
                'email' => 'admin@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ],
            [
                'name' => 'Jacos User',
                'email' => 'user@jacos.co.jp',
                'password' => bcrypt('Qe75ymSr')
            ]
        );

        $user_details_array=array(
            ['users_id'=>1],
            ['users_id'=>2],
            ['users_id'=>3],
        );
        User::insert($user_array);
        users_details::insert($user_details_array);
        
    }
}
