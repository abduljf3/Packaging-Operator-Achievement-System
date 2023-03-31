<?php

namespace App\Http\Controllers;

use Maatwebsite\Excel\Facades\Excel;

class ExcelController extends Controller
{
    public function import(Request $request)
    {
        Excel::import(new MyImport, $request->file('file'));

        return redirect()->back()->with('success', 'Imported successfully!');
    }

    public function export()
    {
        $data = [
            ['Name', 'Email', 'Phone'],
            ['John Doe', 'johndoe@example.com', '555-1234'],
            ['Jane Doe', 'janedoe@example.com', '555-5678'],
            // ...
        ];

        return Excel::download(new MyExport($data), 'data.xlsx');
    }
}

