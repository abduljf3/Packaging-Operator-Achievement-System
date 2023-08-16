<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\ParcelImport;
use App\Models\Parcel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ParcelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parcels = Parcel::orderBy('quantity')->get();
        return Inertia::render('Admin/Parcel/Index',[
            'parcels' => $parcels
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $parcels = Parcel::orderBy('quantity')->get();
        return Inertia::render('Admin/Parcel/Create',[
            'parcels' => $parcels
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
        $data = $request->all();
        Parcel::create($data);
        return redirect()->route('admin.parcel.index')->with([
            'message' => 'Berhasil Disimpan',
            'type' => 'success',
        ]);
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
    public function edit(Parcel $parcel)
    {
        $parcels = Parcel::where('quantity','!=',$parcel->quantity)->orderBy('quantity')->get();
        return Inertia::render('Admin/Parcel/Edit',[
            'parcel' => $parcel,
            'parcels' => $parcels,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Parcel $parcel)
    {
        $data = $request->all();
        $parcel->update($data);
        return redirect()->route('admin.parcel.index')->with([
            'message' => 'Berhasil Diupdate',
            'type' => 'success',
        ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Parcel $parcel)
    {
        $parcel->delete();
        return redirect()->route('admin.parcel.index')->with([
            'message' => 'Berhasil Dihapus',
            'type' => 'success',
        ]);
    }

    public function import(Request $request)
    { 
        $file = $request->file('file');
        Excel::import(new ParcelImport, $file, 'parcel');  
        return redirect(route('admin.parcel.index'))->with([
            'message' => 'Data qty parcel berhasil diimport',
            'type' => 'success',
        ]);
    }
}
