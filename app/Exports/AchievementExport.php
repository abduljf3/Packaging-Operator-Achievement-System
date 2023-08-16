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
                'achievements.qty',
                'achievements.start',
                'achievements.finish',
                DB::raw('CAST((TIME_TO_SEC(TIMEDIFF(achievements.finish, achievements.start)) / 60 / 420) * product_parcels.quantity AS SIGNED) as target'),
                DB::raw('CAST((achievements.qty / ((TIME_TO_SEC(TIMEDIFF(achievements.finish, achievements.start)) / 60 / 420) * product_parcels.quantity) * 100) AS SIGNED) as achievement_percent')
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
            'Qty (pcs)',
            'Start',
            'Finish',
            'Target (pcs)',
            'Achievement (%)'
        ];
    }

    
}
