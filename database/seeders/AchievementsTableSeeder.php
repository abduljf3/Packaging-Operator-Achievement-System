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
                'group' => '3',
                'proses' => '1',
                'npk' => '8828732N',
                'drw_no' => '4',
                'product_id' => 'Oil Seals',
                'spring_lot' => 'Oil Seals',
                'product_lot' => 'Oil Seals',
                'total_lot' => 'Oil Seals',
                'qty' => 'Oil Seals',
                'remarks' => 'Oil Seals',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
