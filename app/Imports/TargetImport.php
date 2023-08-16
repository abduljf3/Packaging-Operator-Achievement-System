<?php

namespace App\Imports;

use App\Models\Parcel;
use App\Models\Product;
use App\Models\ProductParcel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TargetImport implements ToModel, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        if (!empty($row['drw_no']) && !empty($row['qty_parcel'])) {
            $product = Product::where('drw_no', $row['drw_no'])->first();
            $parcel = Parcel::where('quantity', $row['qty_parcel'])->first();
            
            if ($product && $parcel) {
                $target = ProductParcel::where('product_id', $product->id)->where('parcel_id',$parcel->id)->first();
                if(!$target){
                    return new ProductParcel([
                        'product_id' => $product->id,
                        'parcel_id' => $parcel->id,
                        'quantity' => $row['target_shift'],
                    ]);
                }
            }
            return null; 
        }
    }
}
