<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdminProductExport;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $products= Product::get();
        return Inertia::render('Admin/Products/Index',[
            'products'=>$products
        ]);
    }
    public function print_data_product()
    {
        $products = Product::all();
        $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
        $pdf = Pdf::loadView('print_data_product', ['products' => $products]);
    
        $tempFilePath = tempnam(sys_get_temp_dir(), 'pdf');
        $pdf->save($tempFilePath);
    
        return response()->file($tempFilePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="List_Karyawan - ' . $dateNow . '.pdf"',
        ])->deleteFileAfterSend(true);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $customers = Customer::get();
        return Inertia::render('Admin/Products/Create',[
            
        'customers'=>$customers]);
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
             'customer_id' => 'required', 
             'customer_name' => 'required', 
             'drw_no' => 'required', 
             'product_name' => 'required',
             'product_type' => 'required',
             'target' => 'required',
         ]);
     
         $products = Product::create($validatedData);
     
         $customers = Customer::all(); // Retrieve all customers from the "customers" table
     
         return redirect()->route('products.index')->with('customers', $customers);
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
        $products = Product::with('customer')->findOrFail($id);
        $customers = Customer::all();
        return Inertia::render('Admin/Products/Edit', [
            'products' => $products,
            'customers' => $customers,
        ]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'customer_id' => 'required', 
            'customer_name' => 'required', 
            'drw_no' => 'required', 
            'product_name' => 'required',
            'product_type' => 'required',
            'target' => 'required',
           
        ]);
    
        $products = Product::findOrFail($request->id); // find the operator by id
        $products->update($validatedData); // update the operator instance
    
        return redirect()->route('admin.products.index');
    }


    public function delete($id)
    {
        $products = Product::findOrFail($id);
        return Inertia::render('Admin/Product/Delete',[
            'products' => $products
        ]);
    }
    public function destroy($id)
    {
        $products = Product::where('id', $id)->firstorfail()->delete();
        echo ("User Record deleted successfully.");
        return redirect()->route("admin.products.index");
     }
     public function cetak_pdf_product()
     {
         $products = Product::all();
         $dateNow = Carbon::now()->format('Y_m_d - H:i:s');
         $pdf = Pdf::loadview('product_pdf', ['products' => $products]);
         return $pdf->download('Daftar_Product - ' . $dateNow . '.pdf');
     }
     public function cetak_excel_product()
     {   
        $products = Product::all();
         
         return Excel::download(new AdminProductExport($products), 'Daftar_Product.xlsx');
     }

    }