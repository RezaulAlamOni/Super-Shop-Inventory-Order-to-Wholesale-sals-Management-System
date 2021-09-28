<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_shops', function (Blueprint $table) {
            $table->increments('customer_shop_id')->comment('Customer shop Id');
            $table->string('shop_no',10)->comment('Customer shop Number');
            $table->integer('customer_id')->comment('Customer Id');
            $table->string('shop_name',80)->comment('Customer shop Name');
            $table->text('shop_address')->nullable()->comment('Customer shop address');
            $table->string('shop_postal_code',30)->nullable()->comment('Customer shop postal code');
            $table->string('phone',30)->comment('Customer shop phone number');
            $table->string('email',80)->nullable()->comment('Customer shop email');
            $table->tinyInteger('delivery_cycle')->nullable()->comment('Delivery cycle');
            $table->timestamps();
            //$table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
			//$table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'))->comment('Time of Update');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_shops');
    }
}
