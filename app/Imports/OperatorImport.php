<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OperatorImport implements ToModel, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        if (!empty($row['npk'])) {
            $npk = $row['npk'];
            $user = User::where('npk', $npk)->first();
            if (!$user) {
                return new User([
                    'npk' => $row['npk'],
                    'fullname' => $row['fullname'],
                    'group' => $row['group'],
                    'status' => $row['status'],
                    'role' => "User",
                ]);
            }
            return null; 
        }
    }
}
