<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_orders', function (Blueprint $table) {
            $table->increments('customer_order_id')->comment('Customer order Id');
            $table->integer('customer_id')->comment('Customer Id');
            $table->integer('customer_shop_id')->nullable()->comment('Customer shop Id');
            $table->integer('order_frequency_num')->default('1')->comment('order_frequency_num');
            $table->enum('category',['edi', 'manual'])->default('edi')->comment('category');
            $table->enum('order_type',['normal', 'direct'])->default('normal')->comment('order type');
            $table->string('shipment_number',50)->comment('Shipment Number');
            $table->integer('source')->comment('Source');
            $table->integer('destination')->comment('Destination');
            $table->string('voucher_number',20)->nullable()->comment('Voucher Number');
            $table->enum('status',['未出荷','確定済み', '出荷中','出荷済み'])->default('未出荷')->comment('Status');
            $table->dateTime('order_date')->nullable()->comment('Order date');
            $table->date('shipment_date')->comment('Shipment date');
            $table->date('delivery_date')->nullable()->comment('Delivery date');
            $table->mediumInteger('cost_price_total')->nullable()->comment('Cost Price total');
            $table->mediumInteger('selling_price_total')->nullable()->comment('Selling Price total');
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
        Schema::dropIfExists('customer_orders');
    }
}
