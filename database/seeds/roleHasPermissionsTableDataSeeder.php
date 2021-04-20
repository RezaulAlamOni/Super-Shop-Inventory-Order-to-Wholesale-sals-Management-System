<?php
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
class roleHasPermissionsTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_super_admin = Role::findByName('Super Admin');
        $permissions = Permission::all();
        $role_super_admin->givePermissionTo($permissions);
        
        $role_admin = Role::findByName('Admin');
        $role_admin->givePermissionTo('view_main','change_password','create_roles','retrieve_roles','create_permissions','retrieve_permissions','create_users','retrieve_users');
       
        $role_user = Role::findByName('User');
        $role_user->givePermissionTo('view_main','change_password');
    }
}
