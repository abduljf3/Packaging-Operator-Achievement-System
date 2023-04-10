<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLeaderController extends Controller
{
    public function index()
    {
        $users = User::where('roles','Admin')->get();

        return Inertia::render('Admin/Leader/Index', [
            'users' => $users,
        ]);
    }
  /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    
        return Inertia::render('Admin/Leader/Create');
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
          
            'name' => 'required', 
            'email' => 'required',
             'password' => 'required',
             'roles' => 'required',
          
           
        

         ]);
         $validatedData['password'] = Hash::make($request->password);
       
         $users = User::create($validatedData);
     
         return redirect()->route('Leader.Index');
     }
    public function edit($id)
    {
        $users = User::findOrFail($id);

        return Inertia::render('Admin/Leader/Edit', [
            'users' => $users,
        ]);
    }
 
    public function update(Request $request)
    {
        $validatedData = $request->validate([
         
            'name' => 'required', 
            'email' => 'required',
             'password' => 'required',
             'roles' => 'required',
        ]);
    
        $users = User::findOrFail($request->id); // find the operator by id
        $users->update($validatedData); // update the operator instance
    
        return redirect()->route('leader.index');
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return redirect()->route('Leader.index')->with('message', 'Operator deleted successfully.');
    }
}
