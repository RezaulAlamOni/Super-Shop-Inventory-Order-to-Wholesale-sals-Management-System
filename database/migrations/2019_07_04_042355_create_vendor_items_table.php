<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_items', function (Blueprint $table) {
            $table->increments('vendor_item_id')->comment('Vendor Item Id');
            $table->integer('vendor_id')->comment('Vendor Id');
            $table->integer('maker_id')->comment('maker Id');
            $table->integer('customer_id')->nullable()->comment('customer Id');
            $table->integer('customer_shop_id')->nullable()->comment('customer shp Id');
            $table->string('jan',15)->comment('Vendor Jan');
            $table->enum('order_class', ['basic', 'sale','spot'])->default('basic')->comment('Vendor Class');
            $table->decimal('cost_price',9,2)->comment('Vendor Cost Price');
            $table->decimal('selling_price',9,2)->comment('selling Price');
            $table->decimal('e_cost_price',9,2)->default('0.00')->comment('Estamate Cost Price');
            $table->decimal('e_selling_price',9,2)->default('0.00')->comment('Estamate Price');
            $table->decimal('e_gross_profit',9,2)->default('0.00')->comment('e gross profit');
            $table->decimal('e_gross_profit_margin',9,2)->default('0.00')->comment('e gross profit margin');
            $table->decimal('sale_selling_price',9,2)->comment('sale selling Price');
            $table->decimal('gross_profit',9,2)->comment('profit');
            $table->decimal('gross_profit_margin',9,2)->comment('profit_percentange');
            $table->decimal('sale_cost_price',9,2)->nullable()->comment('sale Vendor Cost Price');
            $table->date('start_date')->comment('basic Start Date');
            $table->date('end_date')->nullable()->comment('basic End Date');
            $table->date('sale_start_date')->nullable()->comment('sale start Date');
            $table->date('sale_end_date')->nullable()->comment('sale End Date');
            $table->enum('order_point_inputs', ['ケース', 'ボール','バラ'])->default('ケース')->comment('Vendor Order Point Inputs');
            $table->smallInteger('order_point_case_quantity')->default('0')->comment('Vendor Order case Point Quantity');
            $table->smallInteger('order_point_ball_quantity')->default('0')->comment('Vendor Order Point ball Quantity');
            $table->smallInteger('order_point_unit_quantity')->default('0')->comment('Vendor Order Point unit Quantity');
            $table->smallInteger('order_point_quantity')->nullable()->comment('Vendor Order Point Quantity');
            $table->enum('order_lot_inputs', ['ケース', 'ボール','バラ'])->default('ケース')->comment('Vendor Order Lot Inputs');
            $table->smallInteger('order_lot_case_quantity')->default('0')->comment('Vendor Order Lot Quantity');
            $table->smallInteger('order_lot_ball_quantity')->default('0')->comment('Vendor Order Lot Quantity');
            $table->smallInteger('order_lot_unit_quantity')->default('0')->comment('Vendor Order Lot Quantity');
            $table->smallInteger('order_lot_quantity')->nullable()->comment('Vendor Order Lot Quantity');
            $table->enum('is_special', ['0', '1'])->default('0')->comment('0defaul1special');
            //$table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
            //$table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'))->comment('Time of Update');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_items');
    }
}
