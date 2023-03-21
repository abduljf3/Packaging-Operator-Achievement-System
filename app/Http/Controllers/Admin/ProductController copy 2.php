<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products= Product::get();
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
    
        return Inertia::render('Admin/Products/Create');
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
          
            'drw_no' => 'required', 
            'product_name' => 'required',
             'product_type' => 'required',
           
        

         ]);
     
         $products = Product::create($validatedData);
     
         return redirect()->route('products.index');
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
        $products = Product::findOrFail($id);

        return Inertia::render('Admin/Products/Edit', [
            'products' => $products,
        ]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'drw_no' => 'required', 
            'product_name' => 'required',
             'product_type' => 'required',
           
        ]);
    
        $products = Product::findOrFail($request->id); // find the operator by id
        $products->update($validatedData); // update the operator instance
    
        return redirect()->route('products.index');
    }


    public function delete(Request $request, $id)
    {
      
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $items = item::where('id', $id)->firstorfail()->delete();
        echo ("User Record deleted successfully.");
        return redirect()->route('products.index');
     }
}
