<?php

namespace Tests\Feature;

use App\Traits\CanAssertFlash;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use WithoutMiddleware;
    // use RefreshDatabase;
    use CanAssertFlash;
    private $create_role_success;
    private $create_role_duplicated;
    private $create_role_invalid;
    private $role_delete_success;
    private $role_delete_unsuccess;
    private $role_update_success;
    private $role_update_duplicated;
    private $assign_role_user;
    private $all_message;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->create_role_success = __('messages.role_setup_completed');
        $this->create_role_duplicated = __('messages.role_duplicated');
        $this->create_role_invalid =  __('messages.role_name_required');
        $this->role_delete_success = __('messages.role_deleted');
        $this->role_delete_unsuccess = __('messages.role_not_deleted');
        $this->role_update_success = __('messages.role_updated');
        $this->role_update_duplicated = $this->create_role_duplicated;

        $this->assign_role_user = 'Success';
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
     * Create role success test.
     *
     * @return void
     */
    public function test_create_role_success()
    {

        $response = $this->json('POST', '/role_insert', ['role_update_id' => '', 'role' => 'Admin'.rand(1, 9). rand(1, 30), 'permissions' => ['1', '2'], 'role_description' => 'Nothing']);
        // $obj=$response->getOriginalContent();
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->create_role_success);
    }
    /**
     * Create role duplicated test.
     *
     * @return void
     */
    public function test_create_role_duplicated()
    {
        $roel_name_nfo = Role::select('name')->where('name', 'Admin')->first();
        $roel_name = $roel_name_nfo['name'];
        $response = $this->json('POST', '/role_insert', ['role_update_id' => '', 'role' => $roel_name, 'permissions' => ['1', '2'], 'role_description' => 'Nothing']);
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->create_role_duplicated);
    }
    /**
     * Create role name blunk test.
     *
     * @return void
     */
    public function test_create_role_invalid()
    {
        $response = $this->json('POST', '/role_insert', ['role_update_id' => '', 'role' => '', 'permissions' => ['1', '2'], 'role_description' => 'Nothing']);
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->create_role_invalid);
    }
    /**
     * Delete role success test.
     *
     * @return void
     */
    public function test_role_delete_success()
    {
        $deleteable_role = Role::where('is_system', 0)->get();
        $roles = json_decode($deleteable_role);
        if (!empty($roles)) {
            $response = $this->get('role_delete/' . $deleteable_role[0]['id']);
            $this->assertEquals(200, $response->getStatusCode());
            $response->assertJson([$this->all_message => $this->role_delete_success]);
        }
    }
    /**
     * Update role success test.
     *
     * @return void
     */
    public function test_role_update_success()
    {
        $roel_name_nfo = Role::select('name')->where('name', 'Super Admin')->first();
        $roel_name = $roel_name_nfo['name'];
        $response = $this->json('POST', '/role_insert', ['role_update_id' => 1, 'role' => $roel_name, 'permissions' => ['1', '2', '3', '4','5','6','7','8','9','10','11','12','13'], 'role_description' => 'Nothing']);
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->role_update_success);
    }
    /**
     * Update role duplicated test.
     *
     * @return void
     */
    public function test_role_update_duplicated()
    {
        $roel_name_nfo = Role::select('name')->where('name', 'Admin')->first();
        $roel_name = $roel_name_nfo['name'];
        $response = $this->json('POST', '/role_insert', ['role_update_id' => 1, 'role' => $roel_name, 'permissions' => ['1', '2'], 'role_description' => 'Nothing']);
        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHas($this->all_message, $this->role_update_duplicated);
    }
    /**
     * Delete role unsuccess where is_system is 1 test.
     *
     * @return void
     */
    public function test_role_delete_unsuccess()
    {
        $not_deleteable_role = Role::where('is_system', 1)->get();
        $roles = json_decode($not_deleteable_role);
        if (!empty($roles)) {
            $response = $this->get('role_delete/' . $not_deleteable_role[0]['id']);

            $this->assertEquals(200, $response->getStatusCode());
            $response->assertJson([$this->all_message => $this->role_delete_unsuccess]);
        }
    }
    /**
     * Assign role to user test.
     *
     * @return void
     */
    public function test_assign_role_user()
    {
        $response = $this->json('POST', '/assign_model_role', ['user_id' => 1, 'roles' => ['1']]);
        $response
            ->assertStatus(200)
            ->assertJson([
                $this->all_message => $this->assign_role_user,
            ]);
    }

}
