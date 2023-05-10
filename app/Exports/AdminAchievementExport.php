<?php

namespace App\Exports;

use App\Models\Achievement;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class AdminAchievementExport implements FromQuery, WithHeadings, WithTitle
{
    protected $from;
    protected $to;
    
    public function __construct($from, $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function query()
    {
        return DB::table('achievements')
            ->join('users', 'achievements.npk', '=', 'users.npk')
            ->join('products', 'achievements.drw_no', '=', 'products.drw_no')
            ->select(DB::raw('ROW_NUMBER() OVER(ORDER BY achievements.id) AS id'), 'achievements.date', 'achievements.shift', 'users.group', 'achievements.drw_no', 'products.product_type', 'users.fullname', 'achievements.total_lot', 'achievements.qty', 'achievements.remarks')
            ->whereBetween('achievements.date', [$this->from, $this->to])
            ->orderBy('achievements.id');
    }
    public function body(): string
    {
        return 'Report for ' . $this->from . ' to ' . $this->to;
    }
    
    public function headings(): array
    { 
        
        return [
            'ID',
            'Date',
            'Shift',
            'Group',
            'Drawing Number',
            'Type',
            'Operator Name',
            'Lot',
            'Qty',
            'Remarks',
            '',
            'Laporan  Achievement Per Tanggal '. $this->from . ' - ' . $this->to,
        ];
        
        
    }

    public function title(): string
    {
        return 'Detail Report '; // set the title for the Excel file
    }
}
