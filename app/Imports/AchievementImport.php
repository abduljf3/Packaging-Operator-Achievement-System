<?php
namespace App\Imports;

use App\Models\Achievement;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class   AchievementImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Achievement([
            'date' => $row['date'],
            'shift' => $row['shift'],
            'proses' => $row['proses'],
            'npk' => $row['npk'],
            'drw_no' => $row['drw_no'],
            'spring_lot' => $row['spring_lot'],
            'product_lot' => $row['product_lot'],
            'total_lot' => $row['total_lot'],
            'qty' => $row['qty'],
            'remarks' => $row['remarks']
        ]);
    }
}

