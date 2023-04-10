<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'shift',

        'proses',
        'user_id',
        'drw_no',
        'npk',
        
        'spring_lot',
        'product_lot',
        'total_lot',
        'qty',
        'remarks',


    ];
    public function user()
    {
        return $this->belongsTo(User::class,'npk','npk');
    }

    public function product()
    {

        return $this->hasOne(Product::class, 'drw_no', 'drw_no');
    }
}
