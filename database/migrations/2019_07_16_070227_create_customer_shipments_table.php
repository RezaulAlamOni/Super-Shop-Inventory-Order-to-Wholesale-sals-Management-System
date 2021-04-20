<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerShipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_shipments', function (Blueprint $table) {
            $table->increments('customer_shipment_id')->comment('Customer Shipment Id');
            $table->integer('customer_id')->comment('Customer Id');
            $table->integer('customer_order_id')->comment('Customer Order Id');
            $table->integer('customer_order_detail_id')->comment('Customer Order detail Id');
            $table->date('shipment_date')->nullable()->comment('Shipment date');
            $table->enum('inputs', ['ケース', 'ボール','バラ'])->default('ケース')->comment('Inputs');
            $table->smallInteger('quantity')->comment('Quantity');
            $table->smallInteger('confirm_quantity')->comment('confirm quantity');
            $table->string('rack_number',20)->nullable()->comment('rack Number');
            $table->smallInteger('stock_out_quantity')->default(0)->comment('stock out quantity');
            $table->smallInteger('damage_quantity')->default(0)->comment('damage quantity');
            $table->enum('reload_status',['0','1'])->default('0')->comment('reload Status');
            $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
			$table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'))->comment('Time of Update');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_shipments');
    }
}
