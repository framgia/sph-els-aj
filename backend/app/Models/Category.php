<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'description'
  ];

  public function questions()
  {
    return $this->hasMany(Question::class);
  }

  public function lessons() {
    return $this->belongsToMany(User::class, 'lessons', 'category_id', 'user_id')
    ->withTimestamps();
  }

  public function isCategoryTaken()
  {
    return $this->hasOne(Lesson::class)
      ->where('user_id', auth()->user()->id);
  }
}
