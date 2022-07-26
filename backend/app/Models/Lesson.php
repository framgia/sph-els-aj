<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function answers()
  {
    return $this->hasMany(UserAnswer::class);
  }

  public function category()
  {
    return $this->belongsTo(Category::class);
  }
}
