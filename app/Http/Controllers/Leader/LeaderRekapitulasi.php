<?php

namespace App\Http\Controllers\Leader;

use App\Http\Controllers\Controller;
use App\Models\Summary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderRekapitulasi extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $summarys= Summary::get();
        return Inertia::render('Leader/Cetakdata/Rekapitulasi',[
            'summarys'=>$summarys
        ]);
    }
    /**
     * Show the form for creating a new resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $summarys= Summary::get();
        return Inertia::render('Leader/Cetakdata/Create',[
            'summarys'=>$summarys
        ]);
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
        $summarys = Summary::findOrFail($id);
        return Inertia::render('Admin/summarys/Edit',[
            'summarys' => $summarys
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

    public function delete(Request $request, $id)
    {
        $summarys = Summary::findOrFail($id);
        return Inertia::render('Leader/Cetakdata/Delete',[
            'summarys' => $summarys
        ]);
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
}
