<?php

namespace App\Exports;

use App\Models\Achievement;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RecapitulationExport implements FromCollection, WithHeadings
{
    protected $data;

    public function __construct(Collection $data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        return $this->data;
    }

    public function headings(): array
    {
        return [
            'NPK',
            'Name',
            'Total Achievement (pcs)',
            'Achievement (%)',
        ];
    }
}
