<?php
namespace App\Imports;

use App\Models\Achievement;
use App\Models\Parcel;
use App\Models\Product;
use App\Models\ProductParcel;
use App\Models\User;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class   AchievementImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        if (!empty($row['date']) && !empty($row['qty_parcel'])) {
            $npk = $row['npk'];
            $drwNo = $row['drw_no'];
            $user = User::where('npk', $npk)->first();
            $product = Product::where('drw_no', $drwNo)->first();
            $parcel = Parcel::where('quantity', $row['qty_parcel'])->first();
            $target = ProductParcel::where('product_id', $product->id)->where('parcel_id',$parcel->id)->first();

            if ($user && $product && $target) {
                $date = Date::excelToDateTimeObject($row['date']);        
                $achievement = Achievement::where('user_id',$user->id)->where('target_id',$target->id)
                    ->where('product_id',$product->id)->where('date',$date)->where('qty',$row['qty'])->first();
                if(!$achievement){
                    $startTime = Date::excelToTimestamp($row['start']);
                    $finishTime = Date::excelToTimestamp($row['finish']);
                    $startTime -= 7 * 60 * 60; // 7 hours in seconds
                    $finishTime -= 7 * 60 * 60; // 7 hours in seconds
                    return new Achievement([
                        'date' => $date,
                        'shift' => $row['shift'],
                        'spring_lot' => $row['spring_lot'],
                        'product_lot' => $row['product_lot'],
                        'total_lot' => $row['total_lot'],
                        'qty' => $row['qty'],
                        'remarks' => $row['remarks'],
                        'product_id' => $product->id,
                        'user_id' => $user->id,
                        'target_id' => $target->id,
                        'start' => date('H:i:s', $startTime), 
                        'finish' => date('H:i:s', $finishTime),
                    ]);
                }
            }
            return null; 
            
        }
    }
}

