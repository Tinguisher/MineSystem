<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product_variations extends Model
{
    use HasFactory;

    protected $fillable = [
        'products_id',
        'name',
        'quantity',
        'code'
    ];

    public function products(){
        return $this->belongsTo(products::class);
    }

    public function product_images(){
        return $this->hasMany(product_images::class);
    }
}