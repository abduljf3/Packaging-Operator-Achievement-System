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
use App\Exports\CustomerExport;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers= Customer::orderBy('customer_code')->get();
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
        $customers = Customer::select('customer_code')->withTrashed()->get();
        return Inertia::render('Admin/Customers/Create',[
            'customers' => $customers
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
            $customers = $request->all();
            Customer::create($customers);
            return redirect()->route('admin.customers.index')->with([
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
    public function edit(Customer $customer)
    {
        $customers = Customer::select('customer_code')->get();
        return Inertia::render('Admin/Customers/Edit', [
            'customers' => $customers,
            'customer' => $customer,
        ]);
    }

    public function update(Request $request,Customer $customer)
    {
        $data = $request->all();
        $customer->update($data);
        return redirect()->route('admin.customers.index')->with([
            'message' => 'Berhasil Diupdate',
            'type' => 'success',
        ]);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route('admin.customers.index')->with([
            'message' => 'Berhasil Dihapus',
            'type' => 'success',
        ]);
    }

    public function print(Request $request)
    {
        $customers = Customer::get();
        return Inertia::render('Admin/Customers/Print',[
            'customers' => $customers
        ]);
    }

    public function export_pdf(Request $request)
    {
        $customers = Customer::get();
        $pdf = Pdf::loadView('pdf.customer', compact('customers'))->setPaper('A4');
        $filename = "Data Customer.pdf";
        return $pdf->download($filename);
    }
    
    public function export_excel(Request $request)
    {
        $filename = "Data Product.xlsx";
        $customers = Customer::select('customer_code','customer_name')->get();
        return Excel::download(new CustomerExport($customers), $filename);
    }



}