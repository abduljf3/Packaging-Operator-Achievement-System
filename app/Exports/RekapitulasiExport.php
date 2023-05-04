<?php

namespace App\Exports;

use App\Models\Achievement;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RekapitulasiExport implements FromCollection, WithHeadings
{
    protected $from;
    protected $to;

    public function __construct($from, $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function collection()
    {
        return Achievement::with(['user', 'product'])
            ->leftJoin('products', 'achievements.drw_no', '=', 'products.drw_no')
            ->select(
                'achievements.drw_no',
                DB::raw('SUM(achievements.total_lot) as totalLot'),
                DB::raw('SUM(achievements.qty) as totalQty'),
                'products.product_type'
            )
            ->whereBetween('achievements.date', [$this->from, $this->to])
            ->groupBy('achievements.drw_no', 'products.product_type')
            ->get();
    }

    public function headings(): array
    {
        return [
            'Drawing No',
            'Total Lot',
            'Total Quantity',
            'Product Type'
        ];
    }
}
