<?php

namespace App\Exports;

use App\Models\Achievement;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\User;
class AdminEmployeeExport implements FromCollection, WithHeadings
{


    public function collection()
    {
        return User::select( 'id','fullname', 'npk','group','status','roles')
            ->get();
    }
    
    
    public function headings(): array
    {
        return [
            'Id',
            'Name',
            'Npk',
            'Group',
            'Status',
            'Roles'
        ];
    }
}
