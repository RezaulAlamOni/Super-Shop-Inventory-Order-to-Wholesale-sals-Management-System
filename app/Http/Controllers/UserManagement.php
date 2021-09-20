<?php

namespace App\Http\Controllers;

use App\customer;
use App\User;
use App\users_details;
use Auth;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Session;

class UserManagement extends Controller
{
    /**
     * Show the page to manage User.
     *
     * @param Request $request
     * @return A success message as Json format
     */
    public function userCreate(Request $request)
    {
        if (!($validation_name = Validator::make($request->all(), ['name' => 'required|max:50'])->passes())) {
            return $result = response()->json(['message' => 'name_required']);
        }
        if (!($validation_email = Validator::make($request->all(), ['email' => 'required|min:6|email'])->passes())) {
            return $result = response()->json(['message' => 'email_required']);
        }
        if (!($validation_pass = Validator::make($request->all(), ['password' => 'required|min:6'])->passes())) {
            return $result = response()->json(['message' => 'pass_required']);
        }

        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $hash_password = Hash::make($password);
        $user_exist = User::where('email', $email)->first();
        if ($user_exist) {
            return $result = response()->json(['message' => 'invalid']);
        } else {
            $user = new User;
            $user->name = $name;
            $user->email = $email;
            $user->password = $hash_password;
            $user->save();
            $last_user_id = $user->id;
            $user_details = new users_details;
            $user_details->users_id = $last_user_id;
            $user_details->save();

            $users = User::findOrFail($last_user_id);
            $users->assignRole('User');

            return $result = response()->json(['message' => 'success']);
        }

    }

    /**
     * Delete an User.
     *
     * @param int $user_id
     * @return A success message as Json format if user deleted ownself then redirect login page
     */

    public function userDelete($user_id)
    {
        $user_info = User::where('id', $user_id)->first();
        $user_name = $user_info['name'];
        $detail_exist = users_details::where('users_id', $user_id)->first();
        User::where('id', $user_id)->delete();
        if ($detail_exist) {
            $image_exists = $detail_exist['image'];
            $filename = public_path() . '/backend/images/users/' . $image_exists;
            if (file_exists($filename)) {
                @unlink($filename);
            }
            users_details::where('users_id', $user_id)->delete();

        }
        \Log::info('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA User Deleted ');
        return response()->json(['user_name' => $user_name, 'message' => __('messages.user_deleted'), 'class_name' => 'alert-success']);

    }

    /**
     * All user list.
     * @return \Illuminate\Http\Response
     */
    public function userList()
    {
        $title = __('messages.manage_users');
        $active = 'user_list';
        $users = User::get();
        return view('backend.user.user_list', compact('users', 'active', 'title'));
    }

    /**
     * All user list.
     * @return \Illuminate\Http\Response
     */
    public function superList()
    {
        $title = __('messages.super');
        $active = 'super_list';
        $users = customer::get();
        return view('backend.user.super_list', compact('users', 'active', 'title'));
    }

    /**
     * A single user details.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function userDetails(Request $request)
    {
        $user_id = $request->user_id;

        if ($user_id == "553456382u6hsdgh") {
            $user_false_id = $user_id;
            $user_id = Auth::user()->id;
        } else {
            $user_false_id = $user_id;
        }

        $users = DB::select("select * from users as u left join users_details as ud on u.id=ud.users_id where u.id='$user_id'");
        return view('backend.user.user_update', compact('users', 'user_false_id'));
    }

    /**
     * A single user update.
     *
     * @param Request $request
     * @return A success or fail message return as json formated
     */
    public function userUpdate(Request $request)
    {
        if (!($validation_fname = Validator::make($request->all(), ['f_name' => 'max:20'])->passes())) {
            return $result = response()->json(['message' => 'fname_required']);
        }
        if (!($validation_lname = Validator::make($request->all(), ['l_name' => 'max:20'])->passes())) {
            return $result = response()->json(['message' => 'lname_required']);
        }
        if (!($validation_full_name = Validator::make($request->all(), ['full_name' => 'max:50'])->passes())) {
            return $result = response()->json(['message' => 'full_name_required']);
        }
        if (!($validation_email = Validator::make($request->all(), ['email' => 'required|min:6|email'])->passes())) {
            return $result = response()->json(['message' => 'email_required']);
        }
        if (!($validation_phone = Validator::make($request->all(), ['phone' => 'max:50'])->passes())) {
            return $result = response()->json(['message' => 'phone_required']);
        }
        if (!($validation_dob = Validator::make($request->all(), ['dob' => 'date'])->passes())) {
            return $result = response()->json(['message' => 'dob_required']);
        }
        if (!($validation_image = Validator::make($request->all(), ['image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:1024'])->passes())) {
            return $result = response()->json(['message' => 'image_required']);
        }
        if (!($validation_postal = Validator::make($request->all(), ['postal_code' => 'max:20'])->passes())) {
            return $result = response()->json(['message' => 'postal_required']);
        }
        if ($request->id == "553456382u6hsdgh") {
            $user_id = Auth::user()->id;
        } else {

            if (Auth::user()->can('update_users')) {
                $user_id = $request->id;
                \Log::info('Admin Update');
            } else {
                \Log::info('No permission');
                return $result = response()->json(['message' => 'no_permission']);
            }

        }

        $email = $request->email;

        $user = User::find($user_id);
        $user_all_data = User::where('id', '=', $user_id)->first();
        $user_details_data = users_details::where('users_id', '=', $user_id)->first();

        $user_email_exist = $user_all_data->email;
        if ($user_email_exist != $email) {
            if (User::where('email', '=', $email)->first()) {
                return $result = response()->json(['message' => 'exist']);
            }
        }
        \Log::info('User Email=' . $user_email_exist);
        \Log::info('User checked');
        $name = $request->full_name;
        $user->id = $user_id;
        $user->name = $name;
        $user->email = $email;

        $user->save();
        \Log::info('User Saved');
        // $image_full_path = "";
        $file_name = '';

        $file_name_db = $user_details_data['image'];

        \Log::info('file_name_db=' . $file_name_db);
        if ($request->hasFile('image')) {
            if ($file_name_db != '') {
                $image_exists = $file_name_db;
                $filename = storage_path() . '/app/' . config('const.USER_UPLOAD_IMAGES_PATH') . $image_exists;
                \Log::info('file_name_new=' . $filename);
                if (file_exists($filename)) {
                    @unlink($filename);
                }
                \Log::info('User Image path' . $filename);

            }
            // save image file to storage
            $file = $request->file('image');
            $file_name = time() . $file->getClientOriginalName();
            $file->storeAs(config('const.USER_UPLOAD_IMAGES_PATH'), $file_name);
            \Log::info('New Image Name' . $file_name);


        } else {
            $file_name = $file_name_db;
        }
        \Log::info('New Image Name=' . $file_name);
        $update_array = array(
            'first_name' => $request->f_name,
            'last_name' => $request->l_name,
            'phone' => $request->phone,
            'date_of_birth' => $request->dob,
            'gender' => $request->gender,
            'postal_code' => $request->postal_code,
            'image' => $file_name,
        );

        \Log::info('Updated');

        $update = users_details::where('users_id', $user_id)
            ->update($update_array);
        \Log::info('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA User Updated ');
        Session::flash('message', __('messages.user_update'));
        Session::flash('class_name', 'alert-success');
        return $result = response()->json(['message' => 'success']);

    }

    /**
     * Change password for an user.
     *
     * @param Request $request
     * @return A success or fail message return as json formated
     */
    public function changePassword(Request $request)
    {
        $user_id = $request->user_id;
        $password = $request->password;
        $validation = Validator::make($request->all(), [
            'password' => 'required|min:6',
        ]);
        if ($validation->passes()) {
            $user_id = $request->user_id;
            $password = $request->password;
            $hashed_password = Hash::make($password);
            $user = User::find($user_id);
            $user->password = $hashed_password;
            $user->save();
            return $result = response()->json(['message' => 'success']);
        } else {
            return $result = response()->json(['message' => 'invalid']);
        }
    }


}
