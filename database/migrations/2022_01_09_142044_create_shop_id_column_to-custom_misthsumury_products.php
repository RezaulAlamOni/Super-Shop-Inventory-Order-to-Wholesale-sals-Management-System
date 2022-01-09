<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopIdColumnToCustomMisthsumuryProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_misthsumury_products', function (Blueprint $table) {
            $table->bigInteger('customer_shop_id')->nullable()->after('customer_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('custom_misthsumury_products', function (Blueprint $table) {
            $table->dropColumn('customer_shop_id');
        });
    }
}
