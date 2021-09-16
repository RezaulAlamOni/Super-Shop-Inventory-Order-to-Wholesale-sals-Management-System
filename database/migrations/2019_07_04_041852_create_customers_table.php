<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('customer_id')->comment('Customer Id');
            $table->integer('user_id')->nullable();
            $table->string('name',80)->comment('Customer Name');
            $table->string('partner_code',20)->comment('Customer Partner Code');
            $table->string('phone',20)->comment('Customer Phone Number');
            $table->string('fax',20)->nullable()->comment('Customer Fax');
            $table->string('postal_code',40)->nullable()->comment('Customer Postal Code');
            $table->string('address',200)->nullable()->comment('Customer Address');
            $table->string('image',240)->nullable()->comment('Customer Image Name');
            $table->boolean('is_deleted')->default(0)->comment('delete status');
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
        Schema::dropIfExists('customers');
    }
}
