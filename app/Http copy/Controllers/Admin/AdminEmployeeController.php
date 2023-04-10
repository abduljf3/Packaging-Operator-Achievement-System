<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class AdminEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users= User::get();
        return Inertia::render('Admin/Employee/Index',[
            'users'=>$users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users= User::get();
        return Inertia::render('Admin/Employee/Create',[
            'users'=>$users
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
         $validatedData = $request->validate([
            'fullname' => 'required', 
            'npk' => 'required', 
            'group' => 'required', 
            'status' => 'required',
             'password' => 'required',
             'roles' => 'required',
           
        

         ]);
         $validatedData['password'] = Hash::make($request->password);
         $users = User::create($validatedData);
         
         return redirect()->route('employee.index');
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
        $users = user::findOrFail($id);
        return Inertia::render('Admin/Employee/Edit',[
            'users' => $users
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
    public function update(Request $request, User $user)
    {
        $data=$request->all();
        $user->update($data);
    }

      /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        echo ("User Record deleted successfully.");
        return redirect()->route('employee.index');
     }
}
