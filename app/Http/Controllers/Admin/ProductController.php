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
use App\Exports\ProductExport;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $products= Product::with('customer')->get();
        return Inertia::render('Admin/Products/Index',[
            'products'=>$products
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $customers = Customer::get();
        $products = Product::select('drw_no')->get();
        return Inertia::render('Admin/Products/Create',[
            'customers'=>$customers,
            'products'=>$products,
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
        Product::create([
            'drw_no' => $data['drw_no'],
            'product_name' => $data['product_name'],
            'product_type' => $data['product_type'],
            'target' => $data['target'],
            'product_type' => $data['product_type'],
            'customer_id' => $data['customer_id'],
        ]);
        return redirect(route('admin.products.index'))->with([
            'message' => 'Data produk berhasil di simpan',
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
        $product = Product::with('customer')->findOrFail($id);
        $customers = Customer::all();
        $products = Product::select('drw_no')->get();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'customers' => $customers,
            'products' => $products,
        ]);
    }

    public function update(Request $request,$id)
    {
        $data = $request->all();
        $product = Product::findOrFail($id);
        $product->update([
            'drw_no' => $data['drw_no'],
            'product_name' => $data['product_name'],
            'product_type' => $data['product_type'],
            'target' => $data['target'],
            'product_type' => $data['product_type'],
            'customer_id' => $data['customer_id'],
        ]);
        return redirect(route('admin.products.index'))->with([
            'message' => 'Data produk berhasil di update',
            'type' => 'success',
        ]);
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
        Product::where('id', $id)->firstorfail()->delete();
        return redirect(route('admin.products.index'))->with([
            'message' => 'Data produk berhasil di hapus',
            'type' => 'success',
        ]);
     }

    public function print(Request $request)
    {
        $products = Product::with('customer')->get();
        return Inertia::render('Admin/Products/Print',[
            'products' => $products
        ]);
    }

    public function export_pdf(Request $request)
    {
        $products = Product::with('customer')->get();
        $pdf = Pdf::loadView('pdf.product', compact('products'))->setPaper('A4');
        $filename = "Data Product.pdf";
        return $pdf->download($filename);
    }
    
    public function export_excel(Request $request)
    {
        $filename = "Data Product.xlsx";
        $products = Product::join('customers', 'products.customer_id', '=', 'customers.id')
        ->select('products.drw_no', 'products.product_name', 'products.product_type', 'products.target', 'customers.customer_code', 'customers.customer_name')
        ->get();

        return Excel::download(new ProductExport($products), $filename);
    }
}