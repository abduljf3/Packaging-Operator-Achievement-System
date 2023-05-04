<?php

namespace App\Http\Controllers\Admin;

use App\Exports\AdminAchievementExport;
use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class AdminExcel extends Controller
{
    public function index()
    {
        return Inertia::render('Leader/Index');
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

    public function cetak_pdf_detail_admin(Request $request)
    {
        $from = $request->input('from_date');
        $to = $request->input('to_date');
        
        return Excel::download(new AdminAchievementExport($from, $to), 'Laporan_Detail.xlsx');
    }

    public function sss(Request $request)

    {
    $from = $request->input('from_date');
        $to = $request->input('to_date');

return Excel::download(new AdminAc($from, $to), 'rekapitulasi.xlsx');
    }
    

}
