<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorArrivalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_arrivals', function (Blueprint $table) {
            $table->increments('vendor_arrival_id')->comment('vendor_arrival_id');
            $table->integer('vendor_id')->comment('Vendor Id');
            $table->integer('vendor_order_id')->comment('Vendor Order Id');
            $table->integer('vendor_order_detail_id')->nullable()->comment('Vendor Order Detail Id');
            $table->dateTime('arrival_date')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Arrival date');
            $table->integer('arrival_case_quantity')->nullable()->comment('Case quantity');
            $table->integer('arrival_ball_quantity')->nullable()->comment('Ball quantity');
            $table->integer('arrival_unit_quantity')->nullable()->comment('Unit quantity');
            $table->smallInteger('quantity')->comment('Quantity');
            $table->string('car_rack_number',20)->comment('car Rack number');
            $table->smallInteger('stock_out_quantity')->default(0)->comment('stock out quantity');
            $table->integer('damage_case_quantity')->default('0')->comment('Case quantity');
            $table->integer('damage_ball_quantity')->default('0')->comment('Ball quantity');
            $table->integer('damage_unit_quantity')->default('0')->comment('Unit quantity');
            $table->integer('damage_quantity')->default(0)->comment('damage quantity');
            $table->enum('reload_status',['0','1','2'])->default('0')->comment('reload Status');
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
        Schema::dropIfExists('vendor_arrivals');
    }
}
