<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class PermissionTest extends TestCase
{
    use WithoutMiddleware;
    private $create_permission_success;
    private $create_permission_duplicated;
    private $create_permission_invalid;
    private $delete_permission_success;
    private $permission_update_success;
    private $permission_update_duplicated;
    private $assign_permission_user;
    private $permission_delete_label;
    private $all_message;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->create_permission_success = __('messages.permission_setup_completed');
        $this->create_permission_duplicated = __('messages.permission_name_duplicate');
        $this->create_permission_invalid = __('messages.permission_name_blank');
        $this->delete_permission_success = __('messages.permission_deleted');
        $this->permission_update_success = __('messages.permission_updated');
        $this->permission_update_duplicated = __('messages.permission_updated');
        $this->assign_permission_user = 'Success';

        $this->permission_delete_label = 'delete_message';
        $this->all_message = 'message';

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
     * Create permission success test.
     *
     * @return void
     */
    public function test_create_permission_success()
    {
        $response = $this->json('POST', '/permission_insert', ['permission' => 'edit' .rand(1, 9). rand(1, 30) , 'permission_description' => 'Nothing']);

        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->create_permission_success);
    }
    /**
     * Create permission duplicated test.
     *
     * @return void
     */
    public function test_create_permission_duplicated()
    {
        $permission_name_nfo = Permission::select('name')->where('name', 'create_roles')->first();
        $permission_name = $permission_name_nfo['name'];
        $response = $this->json('POST', '/permission_insert', ['permission' => $permission_name, 'permission_description' => 'Nothing']);

        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->create_permission_duplicated);
        \Log::info('Permission duplicated test passes');

    }
    /**
     * Create permission name blunk test.
     *
     * @return void
     */
    public function test_create_permission_invalid()
    {
        $response = $this->json('POST', '/permission_insert', ['permission' => '', 'permission_description' => 'Nothing']);

        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, __('messages.permission_name_blank'));

    }
    /**
     * Delete permission success test.
     *
     * @return void
     */
    public function test_delete_permission_success()
    {
        $deleteable_Permission = Permission::where('is_system', 0)->get();
        $Permissions = json_decode($deleteable_Permission);
        if (!empty($Permissions)) {
            $response = $this->get('permission_delete/' . $deleteable_Permission[0]['id']);

            $this->assertEquals(200, $response->getStatusCode());
            $response->assertJson([$this->all_message => $this->delete_permission_success]);
        }
    }
    /**
     * Update permission success test.
     *
     * @return void
     */
    public function test_permission_update_success()
    {
        $permission_name_nfo = Permission::select('name')->where('name', 'create_roles')->first();
        $permission_name = $permission_name_nfo['name'];
        $response = $this->json('POST', '/permission_insert', ['permission_update_id' => 1, 'permission' => $permission_name, 'permission_descr' => 'Nothing']);
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->permission_update_success);
    }
    /**
     * Update permission duplicated test.
     *
     * @return void
     */
    public function test_permission_update_duplicated()
    {
        $permission_name_nfo = Permission::select('name')->where('name', 'retrieve_roles')->first();
        $permission_name = $permission_name_nfo['name'];
        $response = $this->json('POST', '/permission_insert', ['permission_update_id' => 1, 'permission' => $permission_name, 'permission_descr' => 'Nothing']);
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->permission_update_duplicated);
    }
    /**
     * Assign permissions to an user test.
     *
     * @return void
     */
    public function test_assign_permission_user()
    {
        $response = $this->json('POST', '/assign_permission_model', ['user_id' => 1, 'permission' => ['1', '3']]);
        $response
            ->assertStatus(200)
            ->assertJson([
                $this->all_message => $this->assign_permission_user,
            ]);
    }

}
