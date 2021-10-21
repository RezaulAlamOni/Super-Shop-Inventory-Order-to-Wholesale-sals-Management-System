<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomMisthsumuryProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_misthsumury_products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',15)->comment('Product Name')->nullable();
            $table->decimal('cost_price',9,2)->comment('Vendor Cost Price')->default(100);
            $table->decimal('selling_price',9,2)->comment('selling Price')->default(120);
            $table->string('image')->nullable();
            $table->integer('case_unit')->nullable();
            $table->integer('ball_unit')->nullable();
            $table->decimal('gross_profit',9,2)->nullable();
            $table->decimal('gross_profit_margin',9,2)->default(20);
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
        Schema::dropIfExists('custom_misthsumury_products');
    }
}
