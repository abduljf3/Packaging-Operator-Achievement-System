<?php

namespace Database\Seeders;

use App\Models\achievement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AchievementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        achievement::insert([
            [
                'date' =>now(),
                'shift' => '2',
                'proses' => '1',
                'npk' => '8484',
                'drw_no' => '1K-001',
                'spring_lot' => '10',
                'product_lot' => '20',
                'total_lot' => '30',
                'qty' => '30',
                'remarks' => 'On Progress',
                'created_at' => now(),
                'updated_at' => now(),
            ],   [
                'date' =>now(),
                'shift' => '2',
                'proses' => '1',
                'npk' => '7474',
                'drw_no' => '1K-001',
                'spring_lot' => '7',
                'product_lot' => '7',
                'total_lot' => '70',
                'qty' => '100',
                'remarks' => 'Pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],   [
                'date' =>now(),
                'shift' => '1',
                'proses' => '2',
                'npk' => '7777',
                'drw_no' => '1K-001',
                'spring_lot' => '44',
                'product_lot' => '32',
                'total_lot' => '71',
                'qty' => '150',
                'remarks' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ]
            ,   [
                'date' =>now(),
                'shift' => '3',
                'proses' => '2',
                'npk' => '8888',
                'drw_no' => '1K-002',
                'spring_lot' => '92',
                'product_lot' => '332',
                'total_lot' => '471',
                'qty' => '1520',
                'remarks' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ],   [
                'date' =>'2023-04-11',
                'shift' => '1',
                'proses' => '2',
                'npk' => '9999',
                'drw_no' => '1K-003',
                'spring_lot' => '444',
                'product_lot' => '323',
                'total_lot' => '721',
                'qty' => '1510',
                'remarks' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ],   [
                'date' =>'2023-04-11',
                'shift' => '1',
                'proses' => '2',
                'npk' => '9494',
                'drw_no' => '1K-002',
                'spring_lot' => '521',
                'product_lot' => '432',
                'total_lot' => '5271',
                'qty' => '12150',
                'remarks' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ],   [
                'date' =>now(),
                'shift' => '2',
                'proses' => '2',
                'npk' => '5555',
                'drw_no' => '1K-002',
                'spring_lot' => '644',
                'product_lot' => '732',
                'total_lot' => '1271',
                'qty' => '6150',
                'remarks' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ],   [
                'date' =>now(),
                'shift' => '1',
                'proses' => '2',
                'npk' => '5454',
                'drw_no' => '1K-003',
                'spring_lot' => '421',
                'product_lot' => '432',
                'total_lot' => '271',
                'qty' => '21150',
                'remarks' => 'Selesai',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
