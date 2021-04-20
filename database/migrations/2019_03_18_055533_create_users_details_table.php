<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_details', function (Blueprint $table) {
            $table->increments('users_details_id')->comment('users_details_id');
            $table->integer('users_id')->unsigned()->comment('users_id');
			$table->string('first_name', 80)->comment('first_name')->nullable();
            $table->string('last_name', 80)->comment('last_name')->nullable();
            $table->string('phone', 20)->comment('Phone Number')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->char('gender', 1)->nullable();
            $table->string('postal_code', 40)->comment('postal_code')->nullable();
            $table->char('country', 2)->nullable();
            $table->char('language', 2)->nullable();
            $table->string('time_zone', 40)->comment('time_zone')->nullable();
            $table->string('citi_time_zone', 40)->comment('citime_zone')->nullable();
            $table->string('image', 240)->comment('Image of user')->nullable();
			$table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'))->comment('Time of Update');
            $table->foreign('users_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_details');
    }
}