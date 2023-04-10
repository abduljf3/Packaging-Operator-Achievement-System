<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\achievement;
use App\Models\Operator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperatorController extends Controller
{
    public function index()
    {

        $achievements = achievement::with('user')->get();

        return Inertia::render('Operator/OperatorAchievement/Index', [
            'achievements' => $achievements,
        ]);
    }
  /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    
        return Inertia::render('Operator/OperatorAchievement/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
     public function store(Request $request)
     {
         $validatedData = $request->validate([
          
            'date' => 'required', 
            'shift' => 'required',
             'group' => 'required',
             'proses' => 'required',
             'user_id' => 'required',
             'product_id' => 'required',
             'spring_lot' => 'required',
             'product_lot' => 'required',
             'total_lot' => 'required',
             'qty' => 'required',
             'remarks' => 'required',
           
        

         ]);
     
         $achievements = achievement::create($validatedData);
     
         return redirect()->route('operatorachievement.index');
     }
    public function edit($id)
    {
        $achievements = achievement::findOrFail($id);

        return Inertia::render('Operator/OperatorAchievement/Edit', [
            'achievements' => $achievements,
        ]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required',
            'shift' => 'required',
            'group' => 'required',
            'proses' => 'required',
            'user_id' => 'required',
            'product_id' => 'required',
            'spring_lot' => 'required',
            'product_lot' => 'required',
            'total_lot' => 'required',
            'qty' => 'required',
            'remarks' => 'required',
        ]);
    
        $achievements = achievement::findOrFail($request->id); // find the operator by id
        $achievements->update($validatedData); // update the operator instance
    
        return redirect()->route('operatorachievement.index');
    }

    public function destroy($id)
    {
        achievement::findOrFail($id)->delete();

        return redirect()->route('operatorachievement.index')->with('message', 'Operator deleted successfully.');
    }
}
