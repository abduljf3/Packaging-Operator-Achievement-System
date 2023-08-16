<?php

namespace App\Http\Controllers;
use App\Models\Achievement;
use App\Models\Parcel;
use App\Models\Product;
use App\Models\ProductParcel;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementController extends Controller
{
    public function create()
    {
        $users = User::where('roles','user')->get();
        $products = Product::OrderBy('drw_no')->get();
        $parcels = ProductParcel::with('parcel')->get();
        return Inertia::render('AchievementCreate',[
            'users' => $users,
            'products' => $products,
            'parcels' => $parcels,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        Achievement::create($data);
        return redirect(route('achievement.create'))->with([
            'message' => 'Berhasil Disimpan',
            'type' => 'success',
        ]);
    }
}
