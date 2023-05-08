<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Achievement;

class ImportController extends Controller
{
    public function index()
    {
        return view('import');
    }

    public function import(Request $request)
     {
         // Validate the file upload
         $request->validate([
             'file' => 'required|mimes:xlsx,xls,csv'
         ]);
     
         // Get the file from the request
         $file = $request->file('file');
     
         // Reazd the file into an array, skipping the first row
         $data = Excel::toArray([], $file)[0];
         array_shift($data);
     
         // Loop through the array and save each row to the database
         foreach ($data as $row) {
             Achievement::create([
                 'date' => $row[0],
                 'shift' => $row[1],
                 'proses' => $row[2],
                 'npk' => $row[3],
                 'drw_no' => $row[4],
                 'spring_lot' => $row[5],
                 'product_lot' => $row[6],
                 'total_lot' => $row[7],
                 'qty' => $row[8],
                 'remarks' => $row[9],
               
             ]);
         
         }
     
         // Redirect back with a success message
         return redirect()->back()->with('success', 'File imported successfully!');
     }

}    