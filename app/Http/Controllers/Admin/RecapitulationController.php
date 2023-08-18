<?php

namespace App\Http\Controllers\Admin;

use App\Exports\RecapitulationExport;
use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class RecapitulationController extends Controller
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
                $achievements = Achievement::with(['user', 'product', 'target', 'target.parcel'])
                    ->whereBetween('date', [$from, $to])
                    ->get();
            } else {
                $from = date('Y-m-d');
                $to = date('Y-m-d');
                $achievements = Achievement::with(['user', 'product', 'target', 'target.parcel'])
                    ->whereDate('date', '=', $from)
                    ->get();
            }

            // $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            //     $user = $achievementGroup->first()->user;
            //     $totalQuantity = 0; // Set initial value for totalQuantity
            //     $differenceInMinutes = 0; // Set initial value for totalQuantity
            //     $parcelQuantity = 0;
            //     $start = Carbon::parse($achievementGroup->first()->start);
            //     $finish = Carbon::parse($achievementGroup->first()->finish);
            
            //     foreach ($achievementGroup as $achievement) {
            //         $totalQuantity += $achievement->qty;
            //         $differenceInMinutes += $finish->diffInMinutes($start);
            //         $parcelQuantity += $achievement->target->quantity;
            //     }
            
            
            //     $totalAchievements = $achievementGroup->count(); // Count total rows in the achievement group
            
            //     $totalTarget = (int)(($parcelQuantity / (420 * $totalAchievements)) * $differenceInMinutes);
            
            //     return [
            //         'user' => $user,
            //         'totalQuantity' => $totalQuantity,
            //         'parcelQuantity' => $parcelQuantity,
            //         'differenceInMinutes' => $differenceInMinutes,
            //         'totalAchievements' => $totalAchievements,
            //         'totalTarget' => $totalTarget,
            //         'achievementPercentage' => ($totalQuantity / $totalTarget) * 100,
            //     ];
            // });

            // Menghitung target actual berdasarkan formula
        
            $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
                $user = $achievementGroup->first()->user;
                $totalAchievements = $achievementGroup->count();
                $totalAchievementPercentage = 0;
                $totalQuantity = 0;
                $minutes = 0;
        
                foreach ($achievementGroup as $achievement) {
                    $totalQuantity += $achievement->qty;
        
                    // Menghitung target actual
                    $start = Carbon::parse($achievement->start);
                    $finish = Carbon::parse($achievement->finish);
                    if ($achievement->shift === 1) {
                        $minutes = 415;
                    } else if ($achievement->shift === 2) {
                        $minutes = 395;
                    }
                    $differenceInMinutes = $finish->diffInMinutes($start);
                    $targetActual = ($achievement->target->quantity / $minutes) * $differenceInMinutes;
        
                    // Menghitung persentase achievement
                    $achievementPercentage = ($achievement->qty / $targetActual) * 100;
                    $totalAchievementPercentage += $achievementPercentage;
                }
        
                // Menghitung rata-rata persentase achievement
                $averageAchievementPercentage = $totalAchievementPercentage / $totalAchievements;
        
                return [
                    'user' => $user,
                    'average_achievement_percentage' => $averageAchievementPercentage,
                    'totalQuantity' => $totalQuantity,
                ];
            });
        
            return Inertia::render('Admin/Recapitulation/Index', [
                'achievements' => $achievements,
                'userAchievements' => $userAchievements,
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
        //
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
    public function show(Request $request,$id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request,$id)
    {
        $data = $request->all();
        return $data;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function print(Request $request)
    {
        $data = $request->all();
        $from = $data['from_date'];
        $to = $data['to_date'];
    
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

        $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            $user = $achievementGroup->first()->user;
            $totalAchievements = $achievementGroup->count();
            $totalAchievementPercentage = 0;
            $totalQuantity = 0;
            $minutes = 0;
    
            foreach ($achievementGroup as $achievement) {
                $totalQuantity += $achievement->qty;
    
                // Menghitung target actual
                $start = Carbon::parse($achievement->start);
                $finish = Carbon::parse($achievement->finish);
                if ($achievement->shift === 1) {
                    $minutes = 415;
                } else if ($achievement->shift === 2) {
                    $minutes = 395;
                }
                $differenceInMinutes = $finish->diffInMinutes($start);
                $targetActual = ($achievement->target->quantity / $minutes) * $differenceInMinutes;
    
                // Menghitung persentase achievement
                $achievementPercentage = ($achievement->qty / $targetActual) * 100;
                $totalAchievementPercentage += $achievementPercentage;
            }
    
            // Menghitung rata-rata persentase achievement
            $averageAchievementPercentage = $totalAchievementPercentage / $totalAchievements;
    
            return [
                'user' => $user,
                'average_achievement_percentage' => $averageAchievementPercentage,
                'totalQuantity' => $totalQuantity,
            ];
        });
    
        return Inertia::render('Admin/Recapitulation/Print', [
            'userAchievements' => $userAchievements,
            'data' => $data,
        ]);
    }

    public function export_pdf(Request $request)
    {
        $data = $request->all();
        $from = $data['from_date'];
        $to = $data['to_date'];
    
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

        $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            $user = $achievementGroup->first()->user;
            $totalAchievements = $achievementGroup->count();
            $totalAchievementPercentage = 0;
            $totalQuantity = 0;
            $minutes = 0;
    
            foreach ($achievementGroup as $achievement) {
                $totalQuantity += $achievement->qty;
    
                // Menghitung target actual
                $start = Carbon::parse($achievement->start);
                $finish = Carbon::parse($achievement->finish);
                if ($achievement->shift === 1) {
                    $minutes = 415;
                } else if ($achievement->shift === 2) {
                    $minutes = 395;
                }
                $differenceInMinutes = $finish->diffInMinutes($start);
                $targetActual = ($achievement->target->quantity / $minutes) * $differenceInMinutes;
    
                // Menghitung persentase achievement
                $achievementPercentage = ($achievement->qty / $targetActual) * 100;
                $totalAchievementPercentage += $achievementPercentage;
            }
    
            // Menghitung rata-rata persentase achievement
            $averageAchievementPercentage = $totalAchievementPercentage / $totalAchievements;
    
            return [
                'user' => $user,
                'average_achievement_percentage' => $averageAchievementPercentage,
                'totalQuantity' => $totalQuantity,
            ];
        });
        
        $pdf = Pdf::loadView('pdf.recapitulation', compact(['userAchievements','data']))->setPaper('A4', 'landscape');
        $filename = "Achievement_recapitulation_{$data['from_date']}-{$data['to_date']}.pdf";
        return $pdf->download($filename);
    }

    public function export_excel(Request $request)
    {
        $data = $request->all();
        $from = $data['from_date'];
        $to = $data['to_date'];
        $filename = "Achievement_recapitulation_{$from}-{$to}.xlsx";
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

        $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            $user = $achievementGroup->first()->user;
            $totalAchievements = $achievementGroup->count();
            $totalAchievementPercentage = 0;
            $totalQuantity = 0;
            $minutes = 0;
    
            foreach ($achievementGroup as $achievement) {
                $totalQuantity += $achievement->qty;
    
                // Menghitung target actual
                $start = Carbon::parse($achievement->start);
                $finish = Carbon::parse($achievement->finish);
                if ($achievement->shift === 1) {
                    $minutes = 415;
                } else if ($achievement->shift === 2) {
                    $minutes = 395;
                }
                $differenceInMinutes = $finish->diffInMinutes($start);
                $targetActual = ($achievement->target->quantity / $minutes) * $differenceInMinutes;
    
                // Menghitung persentase achievement
                $achievementPercentage = ($achievement->qty / $targetActual) * 100;
                $totalAchievementPercentage += $achievementPercentage;
            }
    
            // Menghitung rata-rata persentase achievement
            $averageAchievementPercentage = round($totalAchievementPercentage / $totalAchievements);
    
            return [
                'npk' => $user->npk,
                'name' => $user->fullname,
                'totalQuantity' => $totalQuantity,
                'average_achievement_percentage' => $averageAchievementPercentage,
            ];
        });
        return Excel::download(new RecapitulationExport($userAchievements), $filename);
    }
}
