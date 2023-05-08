<?php

namespace App\Charts;
use App\Models\Achievement;
use ConsoleTVs\Charts\Classes\Chartjs\Chart;

class SalesChart extends Chart
{
    /**
     * Initializes the chart.
     *
     * @return void
     */
    public function welcome()
    {
        $achievements = Achievement::all();
        $spring_lot = $achievements->pluck('month');
        $data = $achievements->pluck('total');
        
        return view('Sales', compact('labels', 'data'));
    }
    
}
