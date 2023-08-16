<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductImport implements ToModel, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        if (!empty($row['drw_no'])) {
            $product = Product::where('drw_no', $row['drw_no'])->first();
            if (!$product) {
                return new Product([
                    'drw_no' => $row['drw_no'],
                    'product_name' => $row['product_name'],
                    'product_type' => $row['product_type'],
                ]);
            }
            return null; 
        }
    }
}
