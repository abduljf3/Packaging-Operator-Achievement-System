<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
         $table->id();
         $table->string('drw_no');
         $table->string('product_name');
         $table->string('product_type');
         $table->string('target');
         $table->unsignedBigInteger('customer_id');
         $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
         $table->timestamps();
         $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
