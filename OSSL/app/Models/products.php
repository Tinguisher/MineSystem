<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'description',
        'price',
        'categories_id'
    ];

    public function categories(){
        return $this->belongsTo(categories::class);
    }

    public function product_variations(){
        return $this->hasMany(product_variations::class);
    }
}