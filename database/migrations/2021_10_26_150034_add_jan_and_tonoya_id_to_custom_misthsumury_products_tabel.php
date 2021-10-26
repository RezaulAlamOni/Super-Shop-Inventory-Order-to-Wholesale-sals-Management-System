<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddJanAndTonoyaIdToCustomMisthsumuryProductsTabel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_misthsumury_products', function (Blueprint $table) {
            //
            $table->bigInteger('vendor_id')->nullable()->after('name');
            $table->string('vendor_name')->nullable()->after('name');
            $table->string('jan')->nullable()->after('name');
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
            //
        });
    }
}
