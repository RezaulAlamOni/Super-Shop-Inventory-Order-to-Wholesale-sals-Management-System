<?php
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\User;
class modelHasrolesTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $user_super = User::findOrFail($this->user_search('Jacos Super Admin'));
        $user_super->assignRole('Super Admin','Admin','User');

        $user_admin = User::findOrFail($this->user_search('Jacos Admin'));
        $user_admin->assignRole('Admin','User');

        $tonya_user = User::findOrFail($this->user_search('Tonya User'));
        $tonya_user->assignRole('Tonya');

        $super_user = User::findOrFail($this->user_search('Super User'));
        $super_user->assignRole('Super');

        
    }
    private function user_search($user_name){
        $user_info=User::where('name',$user_name)->first();
        return $user_id=$user_info['id'];
    }
}
