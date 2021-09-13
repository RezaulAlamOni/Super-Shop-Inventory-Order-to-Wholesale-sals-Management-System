<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterAddEstamatePriceToVendorProfit extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vendor_items', function (Blueprint $table) {
            $table->decimal('e_gross_profit',9,2)->default('0.00')->comment('e gross profit');
            $table->decimal('e_gross_profit_margin',9,2)->default('0.00')->comment('e gross profit margin');
        });
        Schema::table('estimate_items', function (Blueprint $table) {
            $table->integer('customer_id')->nullable()->comment('customer Id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vendor_profit', function (Blueprint $table) {
            //
        });
    }
}
