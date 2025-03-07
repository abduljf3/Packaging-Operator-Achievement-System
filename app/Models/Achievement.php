<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Achievement extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'date',
        'shift',
        'spring_lot',
        'product_lot',
        'total_lot',
        'qty',
        'start',
        'finish',
        'remarks',
        'user_id',
        'product_id',
        'target_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function target()
    {
        return $this->belongsTo(ProductParcel::class);
    }
}
