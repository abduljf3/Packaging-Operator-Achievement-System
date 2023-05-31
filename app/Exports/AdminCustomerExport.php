<?php

namespace App\Exports;


use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\Customer;
class AdminCustomerExport implements FromCollection, WithHeadings
{


    public function collection()
    {
        return Customer::select( 'id','customer_id','customer_name')
            ->get();
    }
    
    
    public function headings(): array
    {
        return [
            'Id',
            'Customer Id',
            'Customer Name',
        
        ];
    }
}
