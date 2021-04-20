<?php
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class permissionsTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permission_array=array(
            [
                'name' => 'create_roles',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'retrieve_roles',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'update_roles',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'delete_roles',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'create_permissions',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'retrieve_permissions',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'update_permissions',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'delete_permissions',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'create_users',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'retrieve_users',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'update_users',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'delete_users',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'ban_users',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'view_main',
                'guard_name' => 'web',
                'is_system' => 1,
            ],
            [
                'name' => 'change_password',
                'guard_name' => 'web',
                'is_system' => 1,
            ]
        );
        DB::table('permissions')->insert($permission_array);
    }
}
