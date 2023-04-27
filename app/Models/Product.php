<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'customer_name',
        'drw_no',
        'product_name',
        'product_type',
        'target',
    ];
    public function achievements()
    {
        return $this->hasMany(Achievement::class);
    }
}
