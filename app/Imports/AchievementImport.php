<?php
namespace App\Imports;

use App\Models\Achievement;
use App\Models\Product;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class   AchievementImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        if (!empty($row['date'])) {
            $npk = $row['npk'];
            $drwNo = $row['drw_no'];
            $user = User::where('npk', $npk)->first();
            $product = Product::where('drw_no', $drwNo)->first();
            if (!$user || !$product) {
                return null; 
            }
            $date = Date::excelToDateTimeObject($row['date']);
            return new Achievement([
                'date' => $date,
                'shift' => $row['shift'],
                'spring_lot' => $row['spring_lot'],
                'product_lot' => $row['product_lot'],
                'total_lot' => $row['total_lot'],
                'qty' => $row['qty'],
                'remarks' => $row['remarks'],
                'product_id' => $product->id,
                'user_id' => $user->id
            ]);
        }
    }
}

