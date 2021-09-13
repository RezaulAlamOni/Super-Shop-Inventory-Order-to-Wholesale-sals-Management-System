<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterAddEstamatePriceToVendor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vendor_items', function (Blueprint $table) {
            $table->decimal('e_cost_price',9,2)->default('0.00')->comment('Estamate Cost Price');
            $table->decimal('e_selling_price',9,2)->default('0.00')->comment('Estamate Price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vendor_items', function (Blueprint $table) {
            //
        });
    }
}
