<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->increments('vendor_id')->comment('Vendor Id');
            $table->string('name',80)->comment('Vendor Name');
            $table->string('email',80)->nullable()->comment('Vendor email');
            $table->string('partner_code',20)->comment('Vendor Partner Code');
            $table->string('phone',20)->comment('Vendor Phone Number');
            $table->string('fax',20)->nullable()->comment('Vendor Fax');
            $table->string('postal_code',40)->nullable()->comment('Vendor Postal Code');
            $table->string('address',200)->nullable()->comment('Vendor Address');
            $table->string('image',240)->nullable()->comment('Vendor Image Name');
            $table->boolean('is_deleted')->default(0)->comment('delete status');
            $table->timestamps();
           // $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
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
        Schema::dropIfExists('vendors');
    }
}
