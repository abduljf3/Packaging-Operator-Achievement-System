<?php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class MyExport implements FromCollection
{
    private $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        return collect($this->data);
    }
}
