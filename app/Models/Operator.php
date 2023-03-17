<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operator extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'shift',
        'group',
        'proses',
        'user_id',
        'user_product',
        'spring_lot',
        'product_lot',
        'total_lot',
        'qty',
        'remarks',
 
      
    ];
}

