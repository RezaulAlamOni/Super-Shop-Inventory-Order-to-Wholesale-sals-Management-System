<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use App\User;

class PermissionController extends Controller
{
    /**
     * Show the page to manage permissions.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function permission($id = null)
    {
        $permission_update_info = array();
        if (!empty($id)) {
            $single_permission = Permission::where('id', $id)->first();
            $permission_update_info = $single_permission;
        }
        $title = __('messages.manage_permission');
        $active = 'permission';
        $permissions = DB::table('permissions')->get();
        return view('backend.pages.permission', compact('permission_update_info', 'permissions', 'title', 'active'));
    }
    /**
     * Insert and update permission
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function permissionInsert(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'permission' => 'required|max:50',
        ]);
        if ($validation->passes()) {
            $permission_update_id = $request->permission_update_id;
            $permission_name = $request->permission;
            $permission_description = $request->permission_descr;
            if ($permission_update_id == null) {
                $permissions = Permission::where('name', $permission_name)->get();
                $permissions = json_decode($permissions);
                if (empty($permissions)) {
                    Permission::create(['name' => $permission_name, 'permission_description' => $permission_description, 'is_system' => 0]);
                    return redirect()->back()->with(['message' => __('messages.permission_setup_completed'), 'class_name' => 'alert-success']);
                } else {
                    return redirect()->back()->with(['message' => __('messages.permission_name_duplicate'), 'class_name' => 'alert-danger']);
                }
            } else {
                $permission_check = Permission::where('id', $permission_update_id)->first();
                if ($permission_check['name'] != $permission_name) {
                    if (Permission::where('name', '=', $permission_name)->exists()) {
                        return redirect()->back()->with(['message' => __('messages.permission_updated'), 'class_name' => 'alert-danger']);
                    }
                }
                Permission::where('id', $permission_update_id)->update([
                    'name' => $permission_name,
                    'permission_description' => $permission_description]);
                return redirect()->back()->with(['message' => __('messages.permission_updated'), 'class_name' => 'alert-success']);
            }

        } else {

            return redirect()->back()->with(['message' => __('messages.permission_name_blank'), 'class_name' => 'alert-danger']);
        }

    }
    /**
     * To delete a permission
     *
     * @param  int permission_id
     * @return a json array with success message to Jquery function.
     */
    public function permissionDelete($permission_id)
    {

        $permission_info=Permission::where([['id', '=', $permission_id], ['is_system', '=', 0]])->first();
        $permission_name=$permission_info['name'];
        
        $is_delete = Permission::where([['id', '=', $permission_id], ['is_system', '=', 0]])->delete();
        if ($is_delete) {
            return response()->json(['permission_name'=>$permission_name,'message' => __('messages.permission_deleted'), 'class_name' => 'alert-success']);
        } else {
            return response()->json(['permission_name'=>$permission_name,'message' =>__('messages.permission_not_deleted'), 'class_name' => 'alert-danger']);
        }


    }

    public function permissionSearch(Request $request){
        // return $request->all();
        $user_id=$request->user_id;
        $user = User::findOrFail($user_id);
        $all_permissions= $user->getAllPermissions();
        $permission_count=count($all_permissions);
        $permission_name_array=array();
        foreach ($all_permissions as $key => $all_permission) {
            $permission_name_array[]='<a href="" id="single_permission_name">'.$all_permission->name.'</a>';
        }
        $permission_implosed=implode(' | ',$permission_name_array);
        return response()->json(['permission_implosed'=>$permission_implosed,'permission_count'=>$permission_count]);
    }
}
