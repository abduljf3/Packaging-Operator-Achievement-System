<?php

namespace App\Http\Controllers\Leader;

use App\Http\Controllers\Controller;
use App\Imports\AchievementImport;
use App\Models\Achievement;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Exports\DetailExport;
use App\Exports\RekapitulasiExport;
use Maatwebsite\Excel\Facades\Excel;

class LeaderController extends Controller
{
    public function index()
    {   
          // Retrieve the daily data for the current month
          $dailyData = DB::table('achievements')
          ->select(DB::raw('DAY(date) as day, SUM(total_lot) as total_lot, SUM(qty) as qty'))
          ->whereYear('date', Carbon::now()->year)
          ->whereMonth('date', Carbon::now()->month)
          ->groupBy('day')
          ->get()
          ->toArray();
              
              
              // Retrieve the weekly data for the current month
              $weeklyData = DB::table('achievements')
              ->select(DB::raw('FLOOR((DAYOFMONTH(date) - 1) / 7) + 1 as week, SUM(total_lot) as total_lot, SUM(qty) as qty'))
              ->whereYear('date', Carbon::now()->year)
              ->whereMonth('date', Carbon::now()->month)
              ->groupBy('week')
              ->get()
              ->toArray();
          
          
              
  
          // Calculate the start and end dates for the query
          $startDate = Carbon::now()->startOfYear();
          $endDate = Carbon::now()->endOfYear();
  
          // Retrieve the monthly data for the past 1 year
          $monthlyData = DB::table('achievements')
              ->select(DB::raw('MONTH(date) as month, SUM(total_lot) as total_lot, SUM(qty) as qty'))
              ->whereBetween('date', [$startDate, $endDate])
              ->groupBy('month')
              ->get()
              ->toArray();
  
          // Add month names to the monthly data
          $monthNames = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
          ];
          $monthlyData = array_map(function ($item) use ($monthNames) {
              $item->month_name = $monthNames[$item->month - 1];
              return $item;
          }, $monthlyData);
  
              // Get the current date
          $currentDate = Carbon::now()->toDateString();
  
          // Retrieve data for the current day
          $shiftData = DB::table('achievements')
              ->select(DB::raw('shift as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
              ->whereDate('date', $currentDate)
              ->groupBy('shift')
              ->get()
              ->toArray();
              
          //Hitung Target Operator
          $personData = DB::table('achievements')
              ->select(DB::raw('users.fullname as name1, SUM(total_lot) as total_lot, SUM(qty) as qty1'))
              ->join('users', 'users.npk', '=', 'achievements.npk')
              ->groupBy('users.fullname')
              ->get()
              ->toArray();
      
              
          // Data Perbulan
          $currentMonth = Carbon::now()->format('m');
  
          // Target Product Per Bulan
          $productData = DB::table('achievements')
      ->select(DB::raw('products.product_type as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
      ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
      ->whereMonth('achievements.date', $currentMonth)
      ->groupBy('products.product_type')
      ->orderBy('qty', 'desc') // Sort by highest qty
      ->get()
      ->toArray();
  
              
                // Chart Atas Januari - Bulan Sekarang
                $yearNow = date('Y');
                $currentMonth = date('m');
                
                $productData1 = DB::table('achievements')
                    ->select(DB::raw('products.product_type as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
                    ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
                    ->whereYear('achievements.date', $yearNow)
                    ->whereMonth('achievements.date', '<=', $currentMonth)
                    ->groupBy('products.product_type')
                    ->get()
                    ->toArray();
                
      
          $data = [
              'Shift' => $shiftData,
              'Person' => $personData,
              'Product' => $productData,
              'Product1' => $productData1,
              'Daily' => $dailyData,
              'Weekly' => $weeklyData,
              'Monthly' => $monthlyData,
          ];
  
    
        return inertia('Leader/Index', ['data' => $data]);
        
    }

    public function rekapitulasi(Request $request)
    {
        $achievements = null;
        $from = null;
        $to = null;
        
        if ($request->input('from_date')) {
            $from = $request->input('from_date');
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user', 'product'])
                ->select('drw_no', DB::raw('SUM(total_lot) as totalLot'), DB::raw('SUM(qty) as totalQty'))
                ->whereBetween('date', [$from, $to])
                ->groupBy('drw_no')
                ->get();
        } else {
          
            $now = Carbon::now();
            $from = $now->startOfMonth()->toDateString();
            $to = $now->endOfMonth()->toDateString();
            $achievements = Achievement::with(['user', 'product'])
                ->select('drw_no', DB::raw('SUM(total_lot) as totalLot'), DB::raw('SUM(qty) as totalQty'))
                ->whereBetween('date', [$from, $to])
                ->groupBy('drw_no')
                ->get();
        }
        
        return Inertia::render('Leader/Rekapitulasi', [
            'achievements' => $achievements,
            'from' => $from,
            'to' => $to
        ]);
    }


    public function detail(Request $request)
    {
        $achievements = null;
        $from = null;
        $to = null;
        if( $request->input('from_date')){
            $achievements = Achievement::all();

            $from = $request->input('from_date');
            $to = $request->input('to_date');;
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        } else{
            $now = Carbon::now();
            $from = $now->startOfMonth()->toDateString();
            $to = $now->endOfMonth()->toDateString();
            $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        }
        return Inertia::render('Leader/Detail',[
            'achievements' => $achievements,
            'from' => $from,
            'to' => $to
        ]);
    }

    public function cetak_pdf(Request $request)
    {
        $from = $request->input('from_date');
        $to = $request->input('to_date');

        $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        $filename = 'Laporan_Rekapitulasi '.$from.' sampai '.$to.'.pdf';
        $pdf = PDF::loadView('rekapitulasi_pdf', [
            'achievements' => $achievements,
            'from' => $from,
            'to' => $to,
        ]);
        return $pdf->download($filename);
    }

    public function cetak_pdf_detail()
    {
        $achievements = Achievement::all();
        $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
        $pdf = Pdf::loadview('detail_pdf', ['achievements' => $achievements]);
        return $pdf->download('Laporan_Detail - ' . $dateNow . '.pdf');
    }
    public function printData()
    {
        $achievements = Achievement::all();
        $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
           return view('print_data')->with(compact('achievements', 'from', 'to'));
    }
    public function printDasta(Request $request)
    {
        $from = $request->input('from_date');
        $to = $request->input('to_date');
    
        $achievements = Achievement::with(['user', 'product'])
            ->whereBetween('date', [$from, $to])
            ->get();
    
        return view('print_data')->with(compact('achievements', 'from', 'to'));
    }
    
    

        public function cetak_excel(Request $request)
    {
        $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
        $from = $request->input('from_date');
        $to = $request->input('to_date');
        return Excel::download(new DetailExport($from, $to), 'Laporan_Achievement_Detail - ' . $dateNow . '.xlsx');
    }

    public function cetak_excel_rekapitulasi(Request $request)

    {
    $from = $request->input('from_date');
        $to = $request->input('to_date');

return Excel::download(new RekapitulasiExport($from, $to), 'rekapitulasi.xlsx');
    }
    
    public function importExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);
    
        $file = $request->file('file');
    
        Excel::import(new AchievementImport, $file);
    
        return redirect()->back()->with('success', 'Data has been imported successfully.');
    }
}
