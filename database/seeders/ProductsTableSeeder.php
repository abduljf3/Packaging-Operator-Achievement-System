<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::insert([
            [
                'drw_no' => '1K-001',
                'customer_id' => 'YIMM',
                'customer_name' => 'Yamaha',
                'product_name' => 'SD 26 13 3',
                'product_type' => 'Oil Seals',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-002',
                'customer_id' => 'YIMMAA',
                'customer_name' => 'Yamaha',
                'product_name' => 'SD 26 13 3',
                'product_type' => 'Oil Seals',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
