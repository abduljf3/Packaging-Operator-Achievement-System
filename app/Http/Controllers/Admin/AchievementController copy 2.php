<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\achievement;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
    
        return Inertia::render('Admin/Achievement/Index',);

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
        if(!empty($request->from_date)) {

            $achievements = DB::table('users')
                ->whereBetween('created_at', array($request->from_date, $request->to_date))
                ->get();

        } else {

            $achievements = null;

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $achievements = achievement::findOrFail($id);
        return Inertia::render('Admin/Achievement/Edit',[
            'achievements' => $achievements
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
        $achievements = achievement::where('id', $id)->firstorfail()->delete();
        echo ("User Record deleted successfully.");
        return redirect()->route('achievement.index');
     }
}
