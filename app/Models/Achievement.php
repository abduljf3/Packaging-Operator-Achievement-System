<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class achievement extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'date',
        'shift',
        'gruop',
        'proses',
        'user_id',
        'user_product',
        'spring_lot',
        'product_lot',
        'total_lot',
        'qty',
        'remarks',
        'created_at',
        'updated_at',
      
    ];
}
