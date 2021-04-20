<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\customer_item;

class CustomerItemTest extends TestCase
{
    use WithoutMiddleware;
    private $customer_item_insert_success_message;
    private $customer_item_insert_customer_id_invalid;
    private $customer_item_insert_jan_code_invalid;
    private $customer_item_insert_jan_name_invalid;
    private $customer_item_insert_cost_price_invalid;
    private $customer_item_insert_selling_price_invalid;
    private $customer_item_insert_customer_jan_duplicated;
    private $customer_item_update_success_message;
    private $customer_item_delete_success_message;

    private $vendor_jan_code;

    private $customer_item_data;
    private $all_message;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->customer_item_insert_success_message = 'insert_success';
        $this->customer_item_insert_customer_id_invalid = 'customer name is required';
        $this->customer_item_insert_vendor_id_invalid = 'vendor name is required';
        $this->customer_item_insert_jan_code_invalid = 'Jan code is required';
        $this->customer_item_insert_jan_name_invalid = 'Jan name is required';
        // $this->customer_item_insert_case_inputs_invalid = 'Case inputs is required';
        // $this->customer_item_insert_ball_inputs_invalid = 'Ball inputs is required';
        $this->customer_item_insert_cost_price_invalid = 'customer price is required';
        $this->customer_item_insert_selling_price_invalid = 'selling price is required';
        $this->customer_item_insert_customer_jan_duplicated = 'jan_code_exists';
        $this->customer_item_update_success_message = 'update_success';
        $this->customer_item_delete_success_message = 'delete_success';

        $this->vendor_jan_code= time();

        $this->customer_item_data = array(
            
                'customer_id'=>'110'.rand(1,30),
                'vendor_id'=>'110'.rand(1,30),
                'jan' => '490837486'.rand(1,100).rand(101,1000),
                'selling_price' => '110',
                'shop_price' => '100',
                'gross_profit' => '10',
                'gross_profit_margin' => '0.1',
                "start_date"=>date('Y-m-d H:i:s'),
                "end_date"=>date('Y-m-d H:i:s'),
            
        );
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

    public function test_customer_item_insert_success(){
        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>0,
            'c_name'=>1,
            'v_name'=>1,
            'j_code' => $this->vendor_jan_code,
            'customer_item_name' => 'Test',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => 100,
            'c_selling_price'=>110,
            'gross_profits'=>10,
            'profit_margins'=>.02
            ]);

        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_insert_success_message,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_item_insert_customer_id_invalid(){
        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>0,
            'c_name'=>'',
            'v_name'=>1,
            'j_code' => $this->vendor_jan_code,
            'customer_item_name' => 'Test',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => 100,
            'c_selling_price'=>110,
            'gross_profits'=>10,
            'profit_margins'=>.02
            ]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_insert_customer_id_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_item_insert_jan_code_invalid(){
        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>0,
            'c_name'=>1,
            'v_name'=>1,
            'j_code' => '',
            'customer_item_name' => 'Test',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => 100,
            'c_selling_price'=>110,
            'gross_profits'=>10,
            'profit_margins'=>.02
            ]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_insert_jan_code_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_item_insert_jan_name_invalid(){
        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>0,
            'c_name'=>1,
            'v_name'=>1,
            'j_code' => $this->vendor_jan_code,
            'customer_item_name' => '',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => 100,
            'c_selling_price'=>110,
            'gross_profits'=>10,
            'profit_margins'=>.02
            ]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_insert_jan_name_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_item_insert_cost_price_invalid(){
        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>0,
            'c_name'=>1,
            'v_name'=>1,
            'j_code' => $this->vendor_jan_code,
            'customer_item_name' => 'Test',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => '',
            'c_selling_price'=>110,
            'gross_profits'=>10,
            'profit_margins'=>.02
            ]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_insert_cost_price_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_item_insert_selling_price_invalid(){
        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>0,
            'c_name'=>1,
            'v_name'=>1,
            'j_code' => $this->vendor_jan_code,
            'customer_item_name' => 'Test',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => 100,
            'c_selling_price'=>'',
            'gross_profits'=>10,
            'profit_margins'=>.02
            ]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_insert_selling_price_invalid,
            ]);
            \Log::info('Test End');
    }
    
    public function test_customer_item_insert_jan_code_duplicated(){
        customer_item::insert($this->customer_item_data);
        $last_data=customer_item::latest()->first();

        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>0,
            'c_name'=>$last_data['customer_id'],
            'v_name'=>1,
            'j_code' => $last_data['jan'],
            'customer_item_name' => 'Test',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => 100,
            'c_selling_price'=>110,
            'gross_profits'=>10,
            'profit_margins'=>.02
            ]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_insert_customer_jan_duplicated,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_item_update_success(){
        customer_item::insert($this->customer_item_data);
        $last_data=customer_item::latest()->first();
        $response = $this->json('POST', '/add_update_customer_item', [
            'customer_item_data_id'=>$last_data['customer_item_id'],
            'c_name'=>1,
            'v_name'=>1,
            'j_code' => $this->vendor_jan_code,
            'customer_item_name' => 'Test',
            'c_qty' => 10,
            'b_qty' => 20,
            'c_price' => 200,
            'c_selling_price'=>220,
            'gross_profits'=>20,
            'profit_margins'=>.04
            ]);
        // $response = $this->json('POST', '/add_customer_item', ['customer_id'=>1,'jan_code' => '490837486', 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '20','price' => '200','customer_item_id'=>1]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_update_success_message,
            ]);
            \Log::info('Test End');
    }
    public function test_customer_item_delete_success(){
        $customer_item_last_id = customer_item::insertGetId($this->customer_item_data);
        $response = $this->json('POST', '/delete_customer_itms_by_id', ['customer_itms_id'=>$customer_item_last_id]);
        \Log::info('Test Start');
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->customer_item_delete_success_message,
            ]);
            \Log::info('Test End');
    }
}
