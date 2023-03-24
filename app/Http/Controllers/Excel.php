<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Excel;

class ExcelController extends Controller
{
    public function export()
    {
        Excel::create('Filename', function($excel) {
            $excel->sheet('Sheetname', function($sheet) {
                $sheet->fromArray([
                    ['Data 1', 'Data 2'],
                    ['Data 3', 'Data 4']
                ]);
            });
        })->export('xlsx');
    }
}
