<?php

namespace Tests\Feature;

use App\User;
use App\users_details;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use DB;

class UserTest extends TestCase
{
    use WithoutMiddleware;

    // public function __construct() {
    //     parent::__construct();
    //     // Your construct here
    //     $this->success_message="Success";
    // }
    private $user_delete;
    private $user_create_success;
    private $user_create_duplicated;
    private $user_create_invalid_name;
    private $user_create_invalid_email;
    private $user_create_invalid_password;
    private $user_user_update_invalid_fname;
    private $user_update_invalid_lname;
    private $user_update_invalid_full_name;
    private $user_update_invalid_email;
    private $user_update_invalid_phone;
    private $user_update_invalid_dob;
    private $user_update_invalid_image;
    private $user_update_invalid_postal;
    private $user_update_success;
    private $user_update_no_permission;
    private $user_update_duplicated;
    private $all_message;

    private $test_user_email;
    private $test_user_update_email;
    private $existing_user_data;

    private $user_array;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->user_delete = __('messages.user_deleted');
        $this->user_create_success = 'success';
        $this->user_create_duplicated = 'invalid';
        $this->user_create_invalid_name = 'name_required';
        $this->user_create_invalid_email = 'email_required';
        $this->user_create_invalid_password = 'pass_required';
        $this->user_user_update_invalid_fname = 'fname_required';
        $this->user_update_invalid_lname = 'lname_required';
        $this->user_update_invalid_full_name = 'full_name_required';
        $this->user_update_invalid_email = 'email_required';
        $this->user_update_invalid_phone = 'phone_required';
        $this->user_update_invalid_dob = 'dob_required';
        $this->user_update_invalid_image = 'image_required';
        $this->user_update_invalid_postal = 'postal_required';
        $this->user_update_success = $this->user_create_success;
        $this->user_update_no_permission = 'no_permission';
        $this->user_update_duplicated = 'exist';
        $this->all_message = 'message';

        $this->test_user_email = 'test_user@gmail.com';
        $this->test_user_update_email = 'test_update@gmail.com';
        $this->existing_user_data = '';

        $this->user_array = array(
            'name'=>'Test User',
            'email'=>'test'.rand(101,1000).rand(1,100).'@test.com',
            'password'=>Hash::make('aheR1ybh')
        );

    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(302);
    }
    
    /**
     * Create user success test.
     *
     * @return void
     */
    public function test_create_user_success()
    {
        if(User::where('email',$this->test_user_email)->exists()){
            User::where('email',$this->test_user_email)->delete();
        }
        $response = $this->json('POST', '/user_create', ['name' => 'Test User', 'email' => $this->test_user_email, 'password' => '123456']);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_create_success,
            ]);
    }
    /**
     * Create user duplicated test.
     *
     * @return void
     */
    public function test_create_user_duplicated()
    {
        // $user_exists = User::select('email')->where('email', 'mayeennbd@gmail.com')->first();
        // User::insert($this->user_array);
        $last_data=User::latest()->first();
        
            $response = $this->json('POST', '/user_create', ['name' => 'Jacos Admin', 'email' => $last_data['email'], 'password' => '123456']);

            $response
                ->assertStatus(200)
                ->assertJson([
                    $this->all_message => $this->user_create_duplicated,
                ]);
        
    }
    /**
     * Create user name length invalid test.
     *
     * @return void
     */
    public function test_create_user_invalid_name()
    {

        $response = $this->json('POST', '/user_create', ['name' => str_repeat('a', 51), 'email' => 'test' . rand(1, 10) . '@gmail.com', 'password' => '123456']);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_create_invalid_name,
            ]);
    }
    /**
     * Create user email invalid test.
     *
     * @return void
     */
    public function test_create_user_invalid_email()
    {

        $response = $this->json('POST', '/user_create', ['name' => 'test', 'email' => 'test' . rand(1, 10), 'password' => '123456']);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_create_invalid_email,
            ]);
    }
    /**
     * Create user password length invalid test.
     *
     * @return void
     */
    public function test_create_user_invalid_password()
    {

        $response = $this->json('POST', '/user_create', ['name' => 'test', 'email' => 'test' . rand(1, 10) . '@gmail.com', 'password' => '1234']);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_create_invalid_password,
            ]);
    }
    /**
     * Update user first name length invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_fname()
    {
        $last_details_data=users_details::latest()->first();

        Storage::fake('photos');
        $response = $this->json('POST', 'update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => 'Test details',
            'email' => 'test_details@gmail.com',
            'f_name' => str_repeat('First Name', 21),
            'l_name' => 'details',
            'phone' => '000000000000',
            'dob' => '1997-10-11',
            'gender' => 'm',
            'postal_code' => '0000',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_user_update_invalid_fname,
            ]);
    }
    /**
     * Update user last name length invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_lname()
    {
        $last_details_data=users_details::latest()->first();

        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => 'Test details',
            'email' => 'test_details@gmail.com',
            'f_name' => 'Test',
            'l_name' => str_repeat('Last Name', 21),
            'phone' => '000000000000',
            'dob' => '1997-10-11',
            'gender' => 'm',
            'postal_code' => '0000',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_update_invalid_lname,
            ]);
    }
    /**
     * Update user fullname length invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_full_name()
    {
        $last_details_data=users_details::latest()->first();
        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => str_repeat('Full Name', 51),
            'email' => 'test_details@gmail.com',
            'f_name' => 'Test',
            'l_name' => 'details',
            'phone' => '000000000000',
            'dob' => '1997-10-11',
            'gender' => 'm',
            'postal_code' => '0000',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_update_invalid_full_name,
            ]);
    }
    /**
     * Update user email invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_email()
    {
        $last_details_data=users_details::latest()->first();
        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => 'Test details',
            'email' => 'test_details',
            'f_name' => 'Test',
            'l_name' => 'details',
            'phone' => '000000000000',
            'dob' => '1997-10-11',
            'gender' => 'm',
            'postal_code' => '0000',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_update_invalid_email,
            ]);
    }
    /**
     * Update user phone number invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_phone()
    {
        $last_details_data=users_details::latest()->first();
        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => 'Test details',
            'email' => 'test_details@gmail.com',
            'f_name' => 'Test',
            'l_name' => 'details',
            'phone' => str_repeat(01670514306, 10),
            'dob' => '1997-10-11',
            'gender' => 'm',
            'postal_code' => '0000',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_update_invalid_phone,
            ]);
    }
    /**
     * Update user date of birth format invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_dob()
    {
        $last_details_data=users_details::latest()->first();
        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => 'Test details',
            'email' => 'test_details@gmail.com',
            'f_name' => 'Test',
            'l_name' => 'details',
            'phone' => '000000000000',
            'dob' => '1997',
            'gender' => 'm',
            'postal_code' => '0000',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_update_invalid_dob,
            ]);
    }
    /**
     * Update user image size invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_image()
    {
        $last_details_data=users_details::latest()->first();
        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => 'Test details',
            'email' => 'test_details@gmail.com',
            'f_name' => 'Test',
            'l_name' => 'details',
            'phone' => '000000000000',
            'dob' => '1997-10-11',
            'gender' => 'm',
            'postal_code' => '0000',
            'image' => UploadedFile::fake()->image('photo1.docs')->size(1200),
        ]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_update_invalid_image,
            ]);
    }
    /**
     * Update user postal code length invalid test.
     *
     * @return void
     */
    public function test_user_update_invalid_postal()
    {
        $last_details_data=users_details::latest()->first();
        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $last_details_data['users_details_id'],
            'full_name' => 'Test details',
            'email' => 'test_details@gmail.com',
            'f_name' => 'Test',
            'l_name' => 'details',
            'phone' => '000000000000',
            'dob' => '1997-10-11',
            'gender' => 'm',
            'postal_code' => str_repeat(1207, 21),
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->user_update_invalid_postal,
            ]);
    }
    /**
     * Update user success test.
     *
     * @return void
     */
    public function test_user_update_success()
    {
        
        // User login for test
        $user = new User();
        $user->id = 1;
        $this->be($user);

        if(User::where('email',$this->test_user_email)->exists()){
            User::where('email',$this->test_user_email)->delete();
        }

        if(User::where('email',$this->test_user_update_email)->exists()){
            User::where('email',$this->test_user_update_email)->delete();
        }
        
        $new_user = factory(\App\User::class)->create();
        // $last_data=User::latest()->first();
        // dd($last_data);

        $new_user_id=$new_user->id;
        users_details::insert(['users_id'=>$new_user_id]);

        \Log::info('User_id Test'.$new_user_id);
        Storage::fake('photos');
        $response =
        $this->json('POST', '/update_user', [
            'id' => $new_user_id,
            'full_name' => 'Test Update',
            'email' => $this->test_user_update_email,
            'f_name' => 'Test',
            'l_name' => 'Update',
            'phone' => '00000000000',
            'dob' => '1997-11-15',
            'gender' => 'm',
            'postal_code' => '1207',
            'image' => UploadedFile::fake()->image('photo1.jpg')->size(100),
        ]);
// return dd($response);
        $response
            ->assertStatus(200)
            ->assertJson([
                $this->all_message => $this->user_update_success,
            ]);
    }
    /**
     * Update user no permission invalid test.
     *
     * @return void
     */
    public function test_user_update_no_permission()
    {
        // User login for test
        $user = new User();
        $user->id = 2;
        $this->be($user);

        Storage::fake('photos');
        $response =
        $this->json('POST', '/update_user', [
            'id' => 1,
            'full_name' => 'Test Update',
            'email' => $this->test_user_update_email,
            'f_name' => 'Test',
            'l_name' => 'Update',
            'phone' => '00000000000',
            'dob' => '1997-11-15',
            'gender' => 'm',
            'postal_code' => '1207',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);
        $response
            ->assertStatus(200)
            ->assertJson([
                $this->all_message => $this->user_update_no_permission,
            ]);
    }
    /**
     * Update user duplicated problem test.
     *
     * @return void
     */
    public function test_user_update_duplicated()
    {
        $user = new User();
        $user->id = 1;
        $this->be($user);

        // $lastRecord = User::last();
        $lastRecord = User::orderBy('id', 'DESC')->first();
        // $last_data=User::latest()->first();

        $new_user = factory(\App\User::class)->create();
        $new_user_id=$new_user->id;

        // User::insert($this->user_array);
        

        Storage::fake('photos');
        $response = $this->json('POST', '/update_user', [
            'id' => $new_user_id,
            'full_name' => 'Test Update',
            'email' => $lastRecord['email'],
            'f_name' => 'Test',
            'l_name' => 'Update',
            'phone' => '00000000000',
            'dob' => '1997-11-15',
            'gender' => 'm',
            'postal_code' => '1207',
            'image' => UploadedFile::fake()->image('photo1.jpg'),
        ]);

        $response
            ->assertStatus(200)
            ->assertJson([
                $this->all_message => $this->user_update_duplicated,
            ]);
    }
    public function test_user_update_own_success()
    {
        //User login for test
        $new_user = factory(\App\User::class)->create();
        $new_user_id=$new_user->id;

        $user = new User();
        $user->id = $new_user_id;
        $this->be($user);
        if(User::where('email',$this->test_user_update_email)->exists()){
            User::where('email',$this->test_user_update_email)->delete();
        }
        

        Storage::fake('photos');
        $response =
        $this->json('POST', '/update_user', [
            'id' => '553456382u6hsdgh',
            'full_name' => 'Test Update',
            'email' => $this->test_user_update_email,
            'f_name' => 'Test',
            'l_name' => 'Update',
            'phone' => '00000000000',
            'dob' => '1997-11-15',
            'gender' => 'm',
            'postal_code' => '1207',
            'image' => UploadedFile::fake()->image('photo1.jpg')->size(100),
        ]);
// return dd($response);
        $response
            ->assertStatus(200)
            ->assertJson([
                $this->all_message => $this->user_update_success,
            ]);
    }
    /**
     * User delete success test.
     *
     * @return void
     */
    public function test_user_delete()
    {
        // $user = factory(\App\User::class)->create();
        
        $last_data=User::orderBy('id', 'DESC')->first();
        $user_id=$last_data['id'];
        $response = $this->get('user_delete/'.$user_id);

        $response
            ->assertStatus(200)
            ->assertJson([
                $this->all_message => $this->user_delete,
            ]);
    }

}
