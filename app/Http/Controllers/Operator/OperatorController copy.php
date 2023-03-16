<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Operator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperatorController extends Controller
{
    public function index()
    {
        $operators = Operator::all();

        return Inertia::render('Operator/OperatorAchievement/Index', [
            'operators' => $operators,
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
          
             'shift' => 'required',
             'group' => 'required',
             'proses' => 'required',
             'user_id' => 'required',
             'user_product' => 'required',
             'spring_lot' => 'required',
             'product_lot' => 'required',
             'total_lot' => 'required',
             'qty' => 'required',
             'remarks' => 'required',
           
        

         ]);
     
         $operators = Operator::create($validatedData);
     
         return redirect()->route('operatorachievement.index');
     }
    public function edit($id)
    {
        $operator = Operator::findOrFail($id);

        return Inertia::render('Admin/Products/Edit', [
            'operator' => $operator,
        ]);
    }
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'shift' => 'required',
            'group' => 'required',
            'proses' => 'required',
            'user_id' => 'required',
            'user_product' => 'required',
            'spring_lot' => 'required',
            'product_lot' => 'required',
            'total_lot' => 'required',
            'qty' => 'required',
            'remarks' => 'required',
        ]);
    
        $operator = Operator::findOrFail($request->id); // find the operator by id
        $operator->update($validatedData); // update the operator instance
    
        return redirect()->route('operatorachievement.index');
    }

    public function destroy($id)
    {
        Operator::findOrFail($id)->delete();

        return redirect()->route('operatorachievement.index')->with('message', 'Operator deleted successfully.');
    }
}
