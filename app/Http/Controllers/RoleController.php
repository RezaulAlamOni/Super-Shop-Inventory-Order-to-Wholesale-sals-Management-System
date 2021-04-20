<?php

namespace App\Http\Controllers;

use App\User;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Show the page to manage Role.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function role($id = null)
    {
        $role_update_info = array();
        if (!empty($id)) {
            $specific_role_info = Role::where('id', $id)->first();
            $role_update_info['role_id'] = $specific_role_info['id'];
            $role_update_info['role_name'] = $specific_role_info['name'];
            $role_update_info['role_description'] = $specific_role_info['role_description'];
            $role_update_info['roles_has_permission'] = array();
            $role_has_permissions = DB::table('role_has_permissions')->select('permission_id')->where('role_id', $id)->get();
            foreach ($role_has_permissions as $key => $role_has_permission) {
                $role_update_info['roles_has_permission'][] = $role_has_permission;
            }
        }

        $title = __('messages.manage_role');
        $active = 'role';
        $roles = Role::all();
        $role_permissions = array();
        foreach ($roles as $role):
            $role_info['role_id'] = $role->id;
            $role_info['role_name'] = $role->name;
            $role_info['guard_name'] = $role->guard_name;
            $role_info['is_system'] = $role->is_system;
            $role_info['role_permissions'] = $this->get_role_permission_by_role_id($role->id);
            $role_permissions[] = $role_info;
        endforeach;

        $all_permissions = $this->get_role_permission_by_role_id();
        return view('backend.pages.role', compact('role_update_info', 'all_permissions', 'role_permissions', 'title', 'active'));
    }
    /**
     * Insert and update role
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function roleInsert(Request $request)
    {
        $role_update_id = $request->role_update_id;
        $permissions = $request->permissions;
        $validation = Validator::make($request->all(), [
            'role' => 'required|max:50',
        ]);
        if ($validation->passes()) {
            $role_name = $request->role;
            $role_description = $request->role_description;
            if ($role_update_id == null) {
                $roles = Role::where('name', $role_name)->get();
                $roles = json_decode($roles);
                if (empty($roles)) {

                    $role_last_id = Role::insertGetId(['name' => $role_name, 'guard_name' => 'web', 'role_description' => $role_description, 'is_system' => 0]);
                    $this->assignPermissionToRole($role_last_id, $permissions);
                    return redirect()->back()->with(['message' => __('messages.role_setup_completed'), 'class_name' => 'alert-success']);
                } else {
                    return redirect()->back()->with(['message' => __('messages.role_duplicated'), 'class_name' => 'alert-danger']);
                }
            } else {
                $roles_check = Role::where('id', $role_update_id)->first();
                if ($roles_check['name'] != $role_name) {
                    if (Role::where('name', '=', $role_name)->exists()) {
                        return redirect()->back()->with(['message' => __('messages.role_duplicated'), 'class_name' => 'alert-danger']);
                    }
                }
                Role::where('id', $role_update_id)->update([
                    'name' => $role_name,
                    'role_description' => $role_description]);
                $this->assignPermissionToRole($role_update_id, $permissions);
                return redirect()->back()->with(['message' => __('messages.role_updated'), 'class_name' => 'alert-success']);
            }

        } else {
            return redirect()->back()->with(['message' => __('messages.role_name_required'), 'class_name' => 'alert-danger']);
        }

    }

    /**
     * Show the page where assign permissions to a User.
     * @return \Illuminate\Http\Response
     */
    public function assignPermissionToModel()
    {
        $title = __('messages.assign_permission_to_role');
        $active = 'assign_permission_model';
        $users = DB::table('users')->get();
        $permissions = DB::table('permissions')->get();

        return view('backend.pages.assign_permission_model', compact('users', 'permissions', 'title', 'active'));
    }
    /**
     * Get permissions of an user.
     *
     * @param  Request $request
     * @return Permissions list of desired user as JSON
     */
    public function getPermissionModel(Request $request)
    {

        $user_id = $request->user_id;
        if ($user_id == 0) {
            return "Not selected";
        }
        $user = User::find($user_id);
        $permissions_exists = $user->permissions;

        $permission_names = DB::select("select * from model_has_roles as mhr inner join role_has_permissions as rhp on mhr.role_id=rhp.role_id inner join permissions as p on p.id=rhp.permission_id where mhr.model_id='$user_id'");

        $permissions = DB::table('permissions')->get();

        $permissions_exist_id = array();
        foreach ($permissions_exists as $key => $permissions_exist) {
            $permissions_exist_id[] = $permissions_exist->id;
        }
        $datas = array();
        foreach ($permission_names as $key => $permission_name) {
            $datas[] = $permission_name->name;
        }
        $match = array();

        $not_matches = array();

        foreach ($permissions as $key => $permission) {
            if (in_array($permission->name, $datas)) {

                $match[] = $permission;
            } else {
                $not_matches[] = $permission;
            }
        }
        $all_permissions_for_user= $user->getAllPermissions();
        $all_permissions_for_user_array=array();
        foreach ($all_permissions_for_user as $all_permission_for_user) {
            $all_permissions_for_user_array[]=$all_permission_for_user->name;
        }
        return response()->json([
            'all_permissions_for_user_array'=>$all_permissions_for_user_array,
            'permissions_exist_id' => $permissions_exist_id, 
            'permissions' => $permissions,
            'not_matches' => $not_matches
            ]);

    }
    /**
     * User permission store in database.
     *
     * @param  Request $request
     * @return A json formated success message
     */
    public function assignPermissionToModelStore(Request $request)
    {
        // return $request->all();
        $user_id = $request->user_id;
        $permission_id = $request->permission;
        $user = User::find($user_id);
        $permission = Permission::all();
        $user->revokePermissionTo($permission);
        $user->syncPermissions($permission_id);
        return $result = response()->json(['message' => 'Success']);
    }
    /**
     * Assign permissions to a role.
     *
     * @param  int $role_id
     * @param  array $permissions
     * @return revoke previous permission and set new permission
     */
    public function assignPermissionToRole($role_id, $permissions)
    {
        $role_id = $role_id;
        $permission_id = $permissions;
        $role = Role::find($role_id);
        $permission = Permission::all();
        $role->revokePermissionTo($permission);

        $role->givePermissionTo($permission_id);
    }
    /**
     * Assign role to an user.
     *
     * @return \Illuminate\Http\Response
     */
    public function assignRoleModel()
    {
        $title = __('messages.user_role');
        $title1 = __('messages.assign_role');
        $active = 'assign_role_model';
        $users = DB::table('users')->get();
        return view('backend.pages.assign_role_model', compact('users', 'title', 'title1', 'active'));
    }
    /**
     * Get roles for a desired user.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function getRole(Request $request)
    {
        $user_id = $request->user_id;
        if ($user_id == 0) {
            return "Not selected";
        }

        $roles = DB::table('roles')->get();
        $model_has_roles = DB::table('model_has_roles')
            ->where('model_id', $user_id)
            ->get();

        $datas = array();
        foreach ($model_has_roles as $key => $model_has_role) {
            $datas[] = $model_has_role->role_id;
        }

        return view('backend.pages.get_role', compact('model_has_roles', 'roles', 'datas'));

    }
    /**
     * Assign roles to a user.
     *
     * @param  int $user_id
     * @param  array $roles
     * @return revoke previous roles and set new roles and return a success message
     */
    public function assignModelRole(Request $request)
    {
        $user_id = $request->user_id;
        $roles = $request->roles;
        $role = Role::find($roles);
        $user = User::findOrFail($user_id);
        $user->syncRoles();
        $user->assignRole($role);
        return $result = response()->json(['message' => 'Success']);
    }
    /**
     * Delete a role
     *
     * @param  int $role_id
     * @return Success or fail message as json format
     */
    public function roleDelete($role_id)
    {
        $role_info=Role::where([['id', '=', $role_id], ['is_system', '=', 0]])->first();
        $role_name=$role_info['name'];
        $is_delete = Role::where([['id', '=', $role_id], ['is_system', '=', 0]])->delete();
        if ($is_delete) {
            return response()->json(['role_name'=>$role_name,'message' => __('messages.role_deleted'), 'class_name' => 'alert-success']);
        } else {
            return response()->json(['role_name'=>$role_name,'message' =>__('messages.role_not_deleted'), 'class_name' => 'alert-danger']);
        }

    }
    /**
     * Get all permission for a desired role
     *
     * @param  int $role_id
     * @return All permission as an array.
     */
    public function get_role_permission_by_role_id($role_id = null)
    {
        if (!empty($role_id)) {
            $permissions = DB::table('permissions')
                ->join('role_has_permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                ->select('permissions.*')
                ->where('role_has_permissions.role_id', $role_id)
                ->get();
                $permission_array=array();
                foreach ($permissions as $key => $permission) {
                    $permission_array[]='<a href="" id="single_permission_name">'.$permission->name.'</a>';
                }
            return $permissions=implode(' | ',$permission_array);
        } else {
            return $permissions = DB::table('permissions')->get();
        }
    }
}
