<?php

namespace App\Http\Controllers;
use App\Models\Archivemenyy;
use Illuminate\Http\Request;

class ArchivemenyyController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    
    public function index()
    {
        $archivemenyss = Archivemenyy::orderBy('id','desc')->paginate(5);
        return view('archivemenyss.index', compact('archivemenyss'));
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create()
    {
        return view('archivemenyss.create');
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'address' => 'required',
        ]);
        
        Archivemenyy::create($request->post());

        return redirect()->route('archivemenyss$archivemenyss.index')->with('success','Archivemenyy has been created successfully.');
    }

    /**
    * Display the specified resource.
    *
    * @param  \App\Archivemenyy  $Archivemenyy
    * @return \Illuminate\Http\Response
    */
    public function show(Archivemenyy $Archivemenyy)
    {
        return view('archivemenyss$archivemenyss.show',compact('Archivemenyy'));
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\Archivemenyy  $Archivemenyy
    * @return \Illuminate\Http\Response
    */
    public function edit(Archivemenyy $Archivemenyy)
    {
        return view('archivemenyss$archivemenyss.edit',compact('Archivemenyy'));
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Archivemenyy  $Archivemenyy
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, Archivemenyy $Archivemenyy)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'address' => 'required',
        ]);
        
        $Archivemenyy->fill($request->post())->save();

        return redirect()->route('archivemenyss$archivemenyss.index')->with('success','Archivemenyy Has Been updated successfully');
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Archivemenyy  $Archivemenyy
    * @return \Illuminate\Http\Response
    */
    public function destroy(Archivemenyy $Archivemenyy)
    {
        $Archivemenyy->delete();
        return redirect()->route('archivemenyss$archivemenyss.index')->with('success','Archivemenyy has been deleted successfully');
    }
}
