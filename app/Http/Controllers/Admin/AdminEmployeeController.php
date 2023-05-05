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
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdminEmployeeExport;
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
         return redirect()->route('admin.employee.index');
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
        return redirect()->route('admin.employee.index');
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
        return redirect()->route('admin.employee.index');
     }
     public function cetak_pdf_employee()
     {
         $users = User::all();
         $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
         $pdf = Pdf::loadview('employee_pdf', ['users' => $users]);
         return $pdf->download('Daftar_Employee - ' . $dateNow . '.pdf');
     }
     public function cetak_excel_employee()
     {   
        $users = User::all();
         
         return Excel::download(new AdminEmployeeExport($users), 'Daftar_Employee.xlsx');
     }
}
