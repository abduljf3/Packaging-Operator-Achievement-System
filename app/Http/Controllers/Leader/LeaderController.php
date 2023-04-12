<?php

namespace App\Http\Controllers\Leader;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class LeaderController extends Controller
{
    public function index()
    {
        return Inertia::render('Leader/Index');
    }

    public function rekapitulasi(Request $request)
    {
        $achievements = null;
        if( $request->input('from_date')){
            $from = $request->input('from_date');
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        }
        return Inertia::render('Leader/Rekapitulasi',[
            'achievements' => $achievements
        ]);
    }
    public function detail(Request $request)
    {
        $achievements = null;
        if( $request->input('from_date')){
            $from = $request->input('from_date');
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        }
        return Inertia::render('Leader/Detail',[
            'achievements' => $achievements
        ]);
    }

    public function cetak_pdf()
    {
    	$achievements = Achievement::all();
 
    	$pdf = Pdf::loadview('rekapitulasi_pdf',['achievements'=>$achievements]);
    	return $pdf->download('laporan-rekapitulasi.pdf');
        
    }
    
    public function cetak_pdf_detail()
    {
        $achievements = Achievement::all();
        $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
    
        $pdf = Pdf::loadview('detail_pdf', ['achievements' => $achievements]);
    
        return $pdf->download('Laporan_Detail - ' . $dateNow . '.pdf');
    }

    public function report()
    {

        return Inertia::render('Leader/Report');
    }

}
