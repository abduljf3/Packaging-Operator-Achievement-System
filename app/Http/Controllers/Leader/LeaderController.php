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
        // Hitung Data Hari Ini
        $today = Carbon::now()->format('Y-m-d');
        $dailyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereBetween('date', [$today.' 00:00:00', $today.' 23:59:59'])
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
    
        // Hitung Data Mingguan
        $oneWeekEarlier = Carbon::now()->subWeek();
        $weeklyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->where('date', '>', $oneWeekEarlier) 
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        // Hitung Data Bulanan
        $oneMonthAgo = Carbon::now()->subMonth(1);
        $monthlyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereDate('date', '>=', $oneMonthAgo)
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        //Hitung Data Shift
        $shiftData = DB::table('achievements')
            ->select(DB::raw('shift as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
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
    
        //Hitung Data Per Product
        $productData = DB::table('achievements')
            ->select(DB::raw('products.product_name as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
            ->groupBy('products.product_name')
            ->get()
            ->toArray();
    
    
    
        $data = [
            'Shift' => $shiftData,
            'Person' => $personData,
            'Product' => $productData,
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
        if( $request->input('from_date')){
            $from = $request->input('from_date');
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user','product'])->select('drw_no', DB::raw('SUM(total_lot) as totalLot'), DB::raw('SUM(qty) as totalQty'))->whereBetween('date',[$from,$to])->groupBy('drw_no')->get();
        }
        return Inertia::render('Leader/Rekapitulasi',[
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
