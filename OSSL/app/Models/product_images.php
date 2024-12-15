<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product_images extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_variations_id',
        'path'
    ];

    public function product_variations(){
        return $this->belongsTo(product_variations::class);
    }
}