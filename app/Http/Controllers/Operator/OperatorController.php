<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Operator;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\User;                                                                                                                             
use Inertia\Inertia;   

class OperatorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {                   
        $products= Operator::get();
        return Inertia::render('Operator/OperatorAchievement/Index',[
            'products'=>$products
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
        // Validate the form data
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
        ]);
    
        // Create a new record in the database
        $user = User::create($validatedData);
    
        // Redirect the user to a success page
        return redirect()->route('success');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $operators = Operator::findOrFail($id);
        return Inertia::render('Operator/OperatorAchievement/Edit',[
            'operators' => $operators
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
        //
    }
    public function destroy($id) 
       {
          $products = Operator::where('id', $id)->firstorfail()->delete();
          echo ("User Record deleted successfully.");
          return redirect()->route('operatorachievement.index');
       }
    } 
 
