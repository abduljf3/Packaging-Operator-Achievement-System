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

        $currentDate = Carbon::now();
        $startDate = $currentDate->subDays(30);

        $maxRecordCount = 400;

        while (Achievement::count() < $maxRecordCount) {
            $date = $faker->dateTimeBetween($startDate, 'now')->format('Y-m-d');
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
