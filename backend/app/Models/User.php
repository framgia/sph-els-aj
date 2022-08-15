<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements HasMedia
{
  use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'type_id',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function type()
  {
    return $this->belongsTo(Type::class);
  }

  public function avatar()
  {
    return $this->media()->where('collection_name', 'avatar');
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('avatar')->singleFile();
  }

  public function followers()
  {
    return $this->belongsToMany(User::class, 'user_follows', 'following_id', 'follower_id');
  }

  public function following()
  {
    return $this->belongsToMany(User::class, 'user_follows', 'follower_id', 'following_id')
      ->withTimestamps();
  }

  public function activityLogs()
  {
    return $this->morphMany(ActivityLog::class, 'loggable');
  }

  public function lessons()
  {
    return $this->belongsToMany(Category::class, 'lessons', 'user_id', 'category_id');
  }
}
