<?php

namespace App\Http\Controllers\Leader;

use App\Exports\RecapitulationExport;
use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Barryvdh\DomPDF\Facade\Pdf;
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

        // Menghitung total pencapaian dan total target per user
        $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            $user = $achievementGroup->first()->user; // Mendapatkan objek pengguna dari grup pencapaian
            $totalAchievement = 0;
            $totalTarget = 0;

            foreach ($achievementGroup as $achievement) {
                $totalAchievement += $achievement->qty;
                $totalTarget += $achievement->product->target;
            }

            return [
                'user' => $user, // Menyertakan data pengguna dalam hasil
                'totalAchievement' => $totalAchievement,
                'totalTarget' => $totalTarget,
                'achievementPercentage' => ($totalAchievement / $totalTarget) * 100,
            ];
        });
    
        return Inertia::render('Leader/Recapitulation/Index', [
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

        // Menghitung total pencapaian dan total target per user
        $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            $user = $achievementGroup->first()->user; // Mendapatkan objek pengguna dari grup pencapaian
            $totalAchievement = 0;
            $totalTarget = 0;

            foreach ($achievementGroup as $achievement) {
                $totalAchievement += $achievement->qty;
                $totalTarget += $achievement->product->target;
            }

            return [
                'user' => $user, // Menyertakan data pengguna dalam hasil
                'totalAchievement' => $totalAchievement,
                'totalTarget' => $totalTarget,
                'achievementPercentage' => ($totalAchievement / $totalTarget) * 100,
            ];
        });
    
        return Inertia::render('Leader/Recapitulation/Print', [
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

        // Menghitung total pencapaian dan total target per user
        $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            $user = $achievementGroup->first()->user; // Mendapatkan objek pengguna dari grup pencapaian
            $totalAchievement = 0;
            $totalTarget = 0;

            foreach ($achievementGroup as $achievement) {
                $totalAchievement += $achievement->qty;
                $totalTarget += $achievement->product->target;
            }

            return [
                'user' => $user, // Menyertakan data pengguna dalam hasil
                'totalAchievement' => $totalAchievement,
                'totalTarget' => $totalTarget,
                'achievementPercentage' => ($totalAchievement / $totalTarget) * 100,
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

        // Menghitung total pencapaian dan total target per user
        $userAchievements = $achievements->groupBy('user_id')->map(function ($achievementGroup) {
            $user = $achievementGroup->first()->user; // Mendapatkan objek pengguna dari grup pencapaian
            $totalAchievement = 0;
            $totalTarget = 0;

            foreach ($achievementGroup as $achievement) {
                $totalAchievement += $achievement->qty;
                $totalTarget += $achievement->product->target;
            }

            return [
                'npk' => $user->npk,
                'name' => $user->fullname,
                'totalAchievement' => $totalAchievement,
                'totalTarget' => $totalTarget,
                'achievementPercentage' => ($totalAchievement / $totalTarget) * 100,
            ];
        });
        return Excel::download(new RecapitulationExport($userAchievements), $filename);
    }
}
