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
use App\Imports\ProductImport;
use App\Imports\TargetImport;
use App\Models\Parcel;
use App\Models\ProductParcel;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $products= Product::with('parcels')->get();
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
        $products = Product::select('drw_no')->withTrashed()->get();
        $parcels = Parcel::orderBy('quantity')->get();
        return Inertia::render('Admin/Products/Create',[
            'products'=>$products,
            'parcels'=>$parcels,
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
        $product = Product::create([
            'drw_no' => $data['drw_no'],
            'product_name' => $data['product_name'],
            'product_type' => $data['product_type'],
        ]);

        foreach ($data['targets'] as $targetData) {
            ProductParcel::create([
                'product_id' => $product->id,
                'parcel_id' => $targetData['parcel_id'],
                'quantity' => $targetData['quantity'],
            ]);
        }

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
    public function edit(Product $product)
    {   
        $customers = Customer::all();
        $products = Product::select('drw_no')->withTrashed()->get();
        $parcels = Parcel::orderBy('quantity')->get();
        $productParcels = $product->parcels()->get();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'customers' => $customers,
            'products' => $products,
            'parcels' => $parcels,
            'productParcels' => $productParcels,
        ]);
    }

    public function update(Request $request,Product $product)
    {
        $data = $request->all();
        $product->update([
            'drw_no' => $data['drw_no'],
            'product_name' => $data['product_name'],
            'product_type' => $data['product_type'],
        ]);

        foreach ($product->parcels as $existingTarget) {
            $targetData = collect($data['targets'])->firstWhere('parcel_id', $existingTarget->id);
        
            if (!$targetData) {
                // Hapus target jika id tidak ada dalam target terbaru
                $product->parcels()->detach($existingTarget);
            } elseif ($existingTarget->pivot->quantity !== $targetData['quantity']) {
                // Update quantity jika berbeda
                $existingTarget->pivot->update([
                    'quantity' => $targetData['quantity'],
                ]);
            }
        }
        
        foreach ($data['targets'] as $targetData) {
            $existingTarget = $product->parcels->firstWhere('pivot.parcel_id', $targetData['parcel_id']);
        
            if (!$existingTarget) {
                // Tambahkan target baru
                $newTarget = Parcel::findOrFail($targetData['parcel_id']);
                $product->parcels()->attach($newTarget, ['quantity' => $targetData['quantity']]);
            }
        }
        
        
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
    public function destroy(Product $product)
    {
        $product->parcels()->detach();
        $product->delete();
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

    public function import(Request $request)
    { 
        $file = $request->file('file');
        Excel::import(new ProductImport, $file, 'product');  
        Excel::import(new TargetImport, $file, 'target');  
        return redirect(route('admin.products.index'))->with([
            'message' => 'Data product berhasil diimport',
            'type' => 'success',
        ]);
    }
}