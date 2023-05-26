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
                'customer_id' => 'YM-001',
                'customer_name' => 'Yamaha',
                'product_name' => 'Oil Seals',
                'product_type' => 'Rubber',
                'target' => '10000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-002',
                'customer_id' => 'YM-002',
                'customer_name' => 'Honda',
                'product_name' => 'Rubber Gum',
                'product_type' => 'Rubber',
                'target' => '20000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-003',
                'customer_id' => 'YM-003',
                'customer_name' => 'Toyota',
                'product_name' => 'Rubber Gun',
                'product_type' => 'Weapon',
                'target' => '10000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-004',
                'customer_id' => 'YM-004',
                'customer_name' => 'Kawasaki',
                'product_name' => 'Rubber Part',
                'product_type' => 'Rubber',
                'target' => '44000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-005',
                'customer_id' => 'YM-004',
                'customer_name' => 'Kawasaki',
                'product_name' => 'Metal Part',
                'product_type' => 'Metal',
                'target' => '100002',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-006',
                'customer_id' => 'YM-005',
                'customer_name' => 'Suzuki',
                'product_name' => 'Comsteer',
                'product_type' => 'Metal',
                'target' => '532132',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-007',
                'customer_id' => 'YM-005',
                'customer_name' => 'Suzuki',
                'product_name' => 'Karburator PE28',
                'product_type' => 'Metal',
                'target' => '66666',
                'created_at' => now(),
                'updated_at' => now(),
            ]
            ,
            [
                'drw_no' => '1K-008',
                'customer_id' => 'YM-006',
                'customer_name' => 'KTM',
                'product_name' => 'Undertail Exhaust',
                'product_type' => 'Metal',
                'target' => '87650',
                'created_at' => now(),
                'updated_at' => now(),
            ]  ,
            [
                'drw_no' => '1K-009',
                'customer_id' => 'YM-006',
                'customer_name' => 'KTM',
                'product_name' => 'Side Exhaust',
                'product_type' => 'Metal',
                'target' => '987654',
                'created_at' => now(),
                'updated_at' => now(),
            ]  ,
            [
                'drw_no' => '1K-010',
                'customer_id' => 'YM-006',
                'customer_name' => 'KTM',
                'product_name' => 'CDI',
                'product_type' => 'Metal',
                'target' => '654345',
                'created_at' => now(),
                'updated_at' => now(),
            ]  ,
            [
                'drw_no' => '1K-011',
                'customer_id' => 'YM-006',
                'customer_name' => 'KTM',
                'product_name' => 'Underbelly Exhaust',
                'product_type' => 'Metal',
                'target' => '987654',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'drw_no' => '1K-012',
                'customer_id' => 'YM-004',
                'customer_name' => 'KTM',
                'product_name' => 'Upperbelly Exhaust',
                'product_type' => 'Metal',
                'target' => '987654',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
