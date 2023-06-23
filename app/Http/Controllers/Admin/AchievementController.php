<?php

namespace App\Http\Controllers\Admin;

use App\Exports\AdminAchievementExport;
use App\Exports\DetailExport;
use App\Http\Controllers\Controller;
use App\Models\achievement;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
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
        $achievements = null;
        $from = $request->input('from_date');
        $to = $request->input('to_date');
    
         if ($from && $to) {
            $achievements = Achievement::with(['user', 'product'])
            ->whereBetween('date', [$from, $to])
            ->get();
        } else {
        $from = date('Y-m-d');
        $to = date('Y-m-d');
        
        $achievements = Achievement::with(['user', 'product'])
            ->whereDate('date', '=', $from)
            ->get();
    }
    
    return Inertia::render('Admin/Achievement/Index', [
        'achievements' => $achievements,
        'from' => $from,
        'to' => $to
    ]);

    }
    public function achievement(Request $request)
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $achievements= achievement::get();
        return Inertia::render('Admin/Achievement/Index',[
            'achievements'=>$achievements
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function print_data(Request $request)
    {
        $from = $request->input('from_date');
        $to = $request->input('to_date');
    
        $achievements = Achievement::whereBetween('date', [$from, $to])->get();
        $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
        $pdf = Pdf::loadView('achievement_pdf', [
            'achievements' => $achievements,
            'from' => $from,
            'to' => $to,
        ]);
    
        $tempFilePath = tempnam(sys_get_temp_dir(), 'pdf');
        $pdf->save($tempFilePath);
    
        return response()->file($tempFilePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="Laporan_Detail - ' . $dateNow . '.pdf"',
        ])->deleteFileAfterSend(true);
    }
    


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
        $users = User::all();
        $products = Product::all();
        $achievements = achievement::with(['user','product'])->findOrFail($id);
        return Inertia::render('Admin/Achievement/Edit',[
            'achievements' => $achievements,
            'users' => $users,
            'Products' => $products
        ]);
    }
    public function delete($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Admin/Achievement/Delete',[
            'product' => $product
        ]);
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
        $data = $request->all();
        $achievements = Achievement ::findOrFail($id);
    
        $achievements->update($data);
        return redirect()->route('admin.achievement.index');
    }

      /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $achievements = achievement::where('id', $id)->firstorfail()->delete();
        echo ("User Record deleted successfully.");
        return redirect()->route('admin.achievement.index');
     }

     public function import(Request $request)
     {  return inertia('importexcel'); 
     }
     

}
