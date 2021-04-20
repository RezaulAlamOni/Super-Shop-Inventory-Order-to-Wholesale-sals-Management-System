<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Traits\CanAssertFlash;
use App\customer;

class CustomerTest extends TestCase
{
    use WithoutMiddleware;
    // use RefreshDatabase;
    use CanAssertFlash;
    
    private $all_message;
    private $customer_insert_success_message;
    private $customer_insert_name_invalid;
    private $customer_insert_code_invalid;
    private $customer_insert_phone_invalid;
    private $customer_code_exists;
    private $customer_update_success;
    private $customer_delete_success;


    private $customer_partner_code;
    private $customer_info;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->customer_insert_success_message = 'insert_success';
        $this->customer_insert_name_invalid = 'name_required';
        $this->customer_insert_code_invalid = 'code_required';
        $this->customer_insert_phone_invalid = 'phone_required';
        $this->customer_code_exists = 'code_exists';
        $this->customer_update_success = 'update_success';
        $this->customer_delete_success = 'delete_success';
        $this->all_message = 'message';



        $this->customer_partner_code=time();

        $this->customer_info=array(
            "name"=>'Test customer',
            "partner_code"=>$this->customer_partner_code,
            "phone"=>'123456789',
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
    public function test_customer_insert_success(){
        
        $response = $this->json('POST', '/customer_add_edit', ['customer_id'=>null,'customer_name' => 'Test customer', 'customer_code' => $this->customer_partner_code, 'customer_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_insert_success_message,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_name_invalid(){
        
        $response = $this->json('POST', '/customer_add_edit', ['customer_id'=>null,'customer_name' => '', 'customer_code' => $this->customer_partner_code, 'customer_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_insert_name_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_code_invalid(){
        
        $response = $this->json('POST', '/customer_add_edit', ['customer_id'=>null,'customer_name' => 'Test customer', 'customer_code' => '', 'customer_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_insert_code_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_phone_invalid(){
        
        $response = $this->json('POST', '/customer_add_edit', ['customer_id'=>null,'customer_name' => 'Test customer', 'customer_code' => $this->customer_partner_code, 'customer_phone' => '']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_insert_phone_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_code_exists(){
        
        customer::insert($this->customer_info);
        $last_data=customer::latest()->first();
        $this->customer_partner_code=$last_data['partner_code'];
        $response = $this->json('POST', '/customer_add_edit', ['customer_id'=>null,'customer_name' => 'Test customer', 'customer_code' => $this->customer_partner_code, 'customer_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_code_exists,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_update_code_exists(){
        $new_customer = factory(\App\customer::class)->create();
        $new_customer_id=$new_customer->customer_id;

        customer::insert($this->customer_info);
        $last_data=customer::latest()->first();
        $this->customer_partner_code=$last_data['partner_code'];
        $response = $this->json('POST', '/customer_add_edit', ['customer_id'=>$new_customer_id,'customer_name' => 'Test customer', 'customer_code' => $this->customer_partner_code, 'customer_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_code_exists,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_update_success(){
        
        customer::insert($this->customer_info);
        $last_data=customer::latest()->first();
        $this->customer_partner_code=$last_data['partner_code'];
        $response = $this->json('POST', '/customer_add_edit', ['customer_id'=>$last_data['customer_id'],'customer_name' => 'Test update', 'customer_code' => $this->customer_partner_code, 'customer_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_update_success,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_delete_success(){
        
        $customer_last_id = customer::insertGetId($this->customer_info);
        $response = $this->json('POST', '/customer_delete', ['customer_id'=>$customer_last_id]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_delete_success,
            ]);
            \Log::info('Test End');
    }
}
