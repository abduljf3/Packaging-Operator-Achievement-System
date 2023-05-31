<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdminCustomerExport;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers= Customer::get();
        return Inertia::render('Admin/Customers/Index',[
            'customers'=>$customers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    
        return Inertia::render('Admin/Customers/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    
     public function store(Request $request)
     {  $customers = Customer::get();
         $validatedData = $request->validate([
            'customer_id' => 'required', 
            'customer_name' => 'required', 
           
           
        

         ]);
     
         $customers = Customer::create($validatedData);
     
         return redirect()->route('customers.index');
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
        $customers = Customer::findOrFail($id);

        return Inertia::render('Admin/Customers/Edit', [
            'customers' => $customers,
        ]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'customer_id' => 'required', 
            'customer_name' => 'required', 
           
           
        ]);
    
        $customers = Customer::findOrFail($request->id); // find the operator by id
        $customers->update($validatedData); // update the operator instance
    
        return redirect()->route('admin.customers.index');
    }


    public function delete($id)
    {
        $customers = Customer::findOrFail($id);
        return Inertia::render('Admin/Customers/Delete',[
            'customers' => $customers
        ]);
    }
    public function destroy($id)
    {
        $customers = Customer::where('id', $id)->firstorfail()->delete();
        echo ("User Record deleted successfully.");
        return redirect()->route("admin.customers.index");
     }
     public function cetak_pdf_customer()
     {
         $customers = Customer::all();
         $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
         $pdf = Pdf::loadview('customer_pdf', ['customers' => $customers]);
         return $pdf->download('Daftar_Customer - ' . $dateNow . '.pdf');
     }
     public function cetak_excel_customer()
     {   
        $customers = Customer::all();
         
         return Excel::download(new AdminCustomerExport($customers), 'Daftar_Customer.xlsx');
     }

    }