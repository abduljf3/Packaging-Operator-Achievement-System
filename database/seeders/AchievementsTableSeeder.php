<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Carbon\Carbon;
use Faker\Factory as FakerFactory;
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
        $faker = FakerFactory::create();
        $shifts = [1, 2, 3];
        $drawingNumbers = range(1, 12);

        $currentYear = Carbon::now()->year;
        
        $maxRecordCount = 400;

        for ($month = 1; $month <= 12; $month++) {
            $startDate = Carbon::create($currentYear, $month, 1);
            $endDate = $startDate->copy()->endOfMonth();
            
            $recordCount = Achievement::whereBetween('date', [$startDate, $endDate])->count();
            $remainingRecords = $maxRecordCount - $recordCount;
            
            for ($i = 0; $i < $remainingRecords; $i++) {
                $date = $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d');
                $shift = $faker->randomElement($shifts);
                $drawingNumber = '1K-' . str_pad($faker->randomElement($drawingNumbers), 3, '0', STR_PAD_LEFT);
                
                Achievement::insert([
                    [
                        'date' => $date,
                        'shift' => $shift,
                        'npk' => '8484',
                        'drw_no' => $drawingNumber,
                        'spring_lot' => '10',
                        'product_lot' => '20',
                        'total_lot' => $faker->numberBetween(100, 500),
                        'qty' => $faker->numberBetween(1000, 5000),
                        'remarks' => 'On Progress',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ]);
            }
        }
    }
}
