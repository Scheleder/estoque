<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained();
            $table->foreignId('brand_id')->constrained();
            $table->foreignId('unit_id')->constrained();
            $table->string('barcode', 45)->nullable();
            $table->string('sap', 45)->nullable();
            $table->string('brand',100)->nullable();
            $table->string('adress',100)->nullable();
            $table->string('description',255);
            $table->decimal('quantity', 10,3)->default('0.000');
            $table->decimal('minimum', 10,3)->default('0.000');
            $table->string('image')->default('product.png');
            $table->boolean('active')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
