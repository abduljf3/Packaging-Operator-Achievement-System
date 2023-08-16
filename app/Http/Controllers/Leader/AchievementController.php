<?php

namespace App\Http\Controllers\Leader;

use App\Exports\AchievementExport;
use App\Http\Controllers\Controller;
use App\Imports\AchievementImport;
use App\Models\achievement;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
class AchievementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $from = $request->input('from_date');
        $to = $request->input('to_date');
        if ($from) {
            $achievements = Achievement::with(['user', 'product','target'])
            ->whereBetween('date', [$from, $to])
            ->get();
        } else {
            $from = date('Y-m-d');
            $to = date('Y-m-d');
            $achievements = Achievement::with(['user', 'product','target'])
                ->whereDate('date', '=', $from)
                ->get();
        }
    
        return Inertia::render('Leader/Achievement/Index', [
            'achievements' => $achievements,
            'from' => $from,
            'to' => $to
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $achievements = null;
        if( $request->input('from_date')){
            $from = $request->input('from_date');
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        }
        return Inertia::render('Admin/Achievement/Index',[
            'achievements' => $achievements
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       
    }
    public function delete($id)
    {
        
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       
    }

      /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
       
     }

    public function import(Request $request)
    { 
        $file = $request->file('file');
        Excel::import(new AchievementImport, $file);  
        return redirect(route('leader.achievement.index'))->with([
            'message' => 'Data achievement berhasil diimport',
            'type' => 'success',
        ]);
    }

    public function print(Request $request)
    {
        $data = $request->all();
        $achievements = Achievement::with(['user','product','target'])
            ->whereBetween('date', [$data['from_date'], $data['to_date']])
            ->get();
        return Inertia::render('Leader/Achievement/Print',[
            'achievements' => $achievements,
            'data' => $data,
        ]);
    }

    public function export_pdf(Request $request)
    {
        $data = $request->all();
        $achievements = Achievement::with(['user','product'])
            ->whereBetween('date', [$data['from_date'], $data['to_date']])
            ->get();
        $pdf = Pdf::loadView('pdf.achievement', compact(['achievements','data']))->setPaper('A4', 'landscape');
        $filename = "Achievement_{$data['from_date']}-{$data['to_date']}.pdf";
        return $pdf->download($filename);
    }
    
    public function export_excel(Request $request)
    {
        $data = $request->all();
        $fromDate = $data['from_date'];
        $toDate = $data['to_date'];
        $filename = "Achievement_{$fromDate}-{$toDate}.xlsx";
        return Excel::download(new AchievementExport($fromDate, $toDate), $filename);
    }
}
