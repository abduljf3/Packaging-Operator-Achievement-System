<?php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToCollection;

class MyImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Do something with each row
        }
    }
}

