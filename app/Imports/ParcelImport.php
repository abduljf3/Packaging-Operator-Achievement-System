<?php

namespace App\Imports;

use App\Models\Parcel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ParcelImport implements ToModel, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        if (!empty($row['quantity'])) {
            $parcel = Parcel::where('quantity',$row['quantity'])->first();
            if (!$parcel) {
                return new Parcel([
                    'quantity' => $row['quantity'],
                ]);
            }
            return null; 
        }
    }
}
