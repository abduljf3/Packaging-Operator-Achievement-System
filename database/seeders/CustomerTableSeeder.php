<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::insert([
            [
                'customer_id' => 'YM-001',
                'customer_name' => 'Yamaha',
             
            ],
            [
  
                'customer_id' => 'YM-002',
                'customer_name' => 'Honda',
         
            ],
            [
             
                'customer_id' => 'YM-003',
                'customer_name' => 'Toyota',
         
            ],
            [
              
                'customer_id' => 'YM-004',
                'customer_name' => 'Kawasaki',
    
            ],
            [
            
                'customer_id' => 'YM-005',
                'customer_name' => 'Izuzu',
      
            ]
            
        ]);
    }
}
