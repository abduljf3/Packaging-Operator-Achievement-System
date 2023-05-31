<?php

namespace App\Exports;


use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\Product;
class AdminProductExport implements FromCollection, WithHeadings
{


    public function collection()
    {
        return Product::select( 'id','drw_no', 'product_name','product_type','customer_id','target')
            ->get();
    }
    
    
    public function headings(): array
    {
        return [
            'Id',
            'Drawing No',
            'Product Name',
            'Product Type',
            'Customer Code',
            'Target'
        ];
    }
}
