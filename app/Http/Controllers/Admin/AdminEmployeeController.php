<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Employee\Update;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserExport;

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
    
     public function store(Request $request)
     {
        $data = $request->all();
        if($data['password']){
            $data['password'] = Hash::make($request->password);
        }else{
            $data['password'] = null;
        }
        User::create($data);
        return redirect(route('admin.employee.index'))->with([
            'message' => 'Data karyawan berhasil di simpan',
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
    public function edit($id)
    {
        $user = User::findorfail($id);
        $users= User::get();
        return Inertia::render('Admin/Employee/Edit',[
            'user' => $user,
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
    public function update(Update $request,$id)
    {
        $data = $request->all();
        $user = User::findOrFail($id);
        $user->update([
            'fullname' => $data['fullname'],
            'npk' => $data['npk'],
            'group' => $data['group'],
            'status' => $data['status'],
            'roles' => $data['roles'],
        ]);
        return redirect(route('admin.employee.index'))->with([
            'message' => 'Data karyawan berhasil di update',
            'type' => 'success',
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
        $user = User::findOrFail($id);
        $user->delete();
        return redirect(route('admin.employee.index'))->with([
            'message' => 'Data karyawan berhasil di hapus',
            'type' => 'success',
        ]);
    }
    
    public function print(Request $request)
    {
        $users = User::all();
        return Inertia::render('Admin/Employee/Print',[
            'users' => $users
        ]);
    }

    public function export_pdf(Request $request)
    {
        $users = User::all();
        $pdf = Pdf::loadView('pdf.employee', compact('users'))->setPaper('A4');
        $filename = "Data Employees.pdf";
        return $pdf->download($filename);
    }
    
    public function export_excel(Request $request)
    {
        $filename = "Data Employees.xlsx";
        $users = User::select('npk','fullname','group','status','roles')->get();
        return Excel::download(new UserExport($users), $filename);
    }
}
