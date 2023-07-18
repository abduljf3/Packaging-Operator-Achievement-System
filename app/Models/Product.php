<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'drw_no',
        'product_name',
        'product_type',
        'target',
        'customer_id',
    ];
    public function achievements()
    {
        return $this->hasMany(Achievement::class);
    }
    
    public function customer(){
        return $this->belongsto(Customer::class);
    }
}
