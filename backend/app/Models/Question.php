<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
  use HasFactory;

  protected $fillable = ['value', 'category_id'];

  public function options()
  {
    return $this->hasMany(Option::class);
  }

  public function category()
  {
    return $this->belongsTo(Category::class);
  }
}
