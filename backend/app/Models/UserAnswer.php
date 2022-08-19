<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function question()
  {
    return $this->belongsTo(Question::class, 'question_id', 'id');
  }

  public function option()
  {
    return $this->belongsTo(Option::class, 'option_id', 'id');
  }

  public function lesson()
  {
    return $this->belongsTo(Lesson::class, 'lesson_id', 'id');
  }

  public function category()
  {
    return $this->hasOneThrough(Category::class, Lesson::class, 'id', 'id', 'lesson_id', 'category_id');
  }
}
