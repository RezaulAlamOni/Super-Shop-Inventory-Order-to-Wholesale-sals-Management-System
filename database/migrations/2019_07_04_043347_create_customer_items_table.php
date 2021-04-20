<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_items', function (Blueprint $table) {
            $table->increments('customer_item_id')->comment('Customer Item Id');
            $table->integer('customer_id')->comment('Customer Id');
            $table->integer('vendor_id')->comment('Vendor Id');
            $table->string('jan',15)->comment('Customer Jan');
            $table->enum('order_class', ['basic', 'sale','spot'])->default('basic')->comment('Customer Class');
            $table->decimal('cost_price')->comment('Customer cost Price');
            $table->decimal('selling_price')->comment('Customer Selling Price');
            $table->decimal('sale_selling_price')->comment('Customer Selling Price');
            $table->decimal('shop_price',9,2)->nullable()->comment('Customer Shop Price');
            $table->decimal('gross_profit',9,2)->comment('Customer Gross Profit');
            $table->decimal('gross_profit_margin',9,2)->comment('Customer Gross Profit Margin');
            $table->dateTime('start_date')->comment('Customer Start Date');
            $table->dateTime('end_date')->comment('Customer End Date');
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
        Schema::dropIfExists('customer_items');
    }
}
