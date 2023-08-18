<?php

namespace App\Exports;

use App\Models\Achievement;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AchievementExport implements FromQuery, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */

    protected $fromDate;
    protected $toDate;

    public function __construct($fromDate, $toDate)
    {
        $this->fromDate = $fromDate;
        $this->toDate = $toDate;
    }

    public function query()
    {
        return Achievement::query()
            ->join('users', 'achievements.user_id', '=', 'users.id')
            ->join('products', 'achievements.product_id', '=', 'products.id')
            ->join('product_parcels', 'achievements.target_id', '=', 'product_parcels.id')
            ->select(
                'achievements.id',
                'achievements.date',
                'achievements.shift',
                'users.npk',
                'users.fullname',
                'products.drw_no',
                'achievements.product_lot',
                'achievements.total_lot',
                'achievements.start',
                'achievements.finish',
                'achievements.qty',
                DB::raw("CASE 
                            WHEN achievements.shift = 1 THEN 
                                ROUND(product_parcels.quantity / 415 * (TIME_TO_SEC(TIMEDIFF(achievements.finish, achievements.start)) / 60), 0)
                            WHEN achievements.shift = 2 THEN 
                                ROUND(product_parcels.quantity / 395 * (TIME_TO_SEC(TIMEDIFF(achievements.finish, achievements.start)) / 60), 0)
                            ELSE 0 
                        END as target"),
                DB::raw("ROUND((achievements.qty / 
                            CASE 
                                WHEN achievements.shift = 1 THEN 
                                    ROUND(product_parcels.quantity / 415 * (TIME_TO_SEC(TIMEDIFF(achievements.finish, achievements.start)) / 60), 2)
                                WHEN achievements.shift = 2 THEN 
                                    ROUND(product_parcels.quantity / 395 * (TIME_TO_SEC(TIMEDIFF(achievements.finish, achievements.start)) / 60), 2)
                                ELSE 1 -- Menghindari pembagian dengan 0
                            END) * 100, 2) as achievement_percent")
            )
            ->whereBetween('achievements.date', [$this->fromDate, $this->toDate]);
    }

    public function headings(): array
    {
        return [
            'No',
            'Date',
            'Shift',
            'NPK',
            'Name',
            'Drw. No.',
            'Lot No.',
            'Total Lot',
            'Start',
            'Finish',
            'Qty (pcs)',
            'Target (pcs)',
            'Achievement (%)'
        ];
    }

    
}
