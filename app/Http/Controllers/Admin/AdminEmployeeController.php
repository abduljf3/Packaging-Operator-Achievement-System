<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Employee\Store;
use App\Http\Requests\Admin\Employee\Update;
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
    public function employee()
    {
        $users = User::where('roles', 'leader')->get();

        return Inertia::render('Admin/Employee/Leader', [
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
    
     public function store(Store $request)
     {
        $data = $request->validated();
        $data['password'] = Hash::make($request->password);
        User::create($data);
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
        $users = User::findorfail($id);
        return Inertia::render('Admin/Employee/Edit',[
            'users' => $users
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Update $request, $id)
    {
        $data = $request->all();
        $user = User::findOrFail($id);
        $data['password'] = Hash::make($request->password);
        $user->update($data);
        return redirect()->route('employee.index');
    }

      /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $users = User::where('id', $id)->firstorfail()->delete();
        echo ("User Record deleted successfully.");
        return redirect()->route('employee.index');
     }
}
