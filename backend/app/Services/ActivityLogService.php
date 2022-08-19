<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\DB;

class ActivityLogService
{
  public static function logFollow(int $idToFollow): void
  {
    auth()->user()->activityLogs()->create([
      'activity_id' => $idToFollow,
      'activity_type' => 'Follow',
      'activity_description' => 'followed',
    ]);
  }

  public static function logLearned(Category $category, array $data): void
  {
    $description = 'learned ' . count($data) . ' of ' . count($data) .
      ' topics in ' . $category->title;
    auth()->user()->activityLogs()->create([
      'activity_id' => $category->id,
      'activity_type' => 'Learned',
      'activity_description' => $description,
    ]);
  }

  public static function getLogs(): array
  {
    $query = DB::select("SELECT activity_logs.* from users INNER JOIN activity_logs on " .
      "users.id = activity_logs.loggable_id and users.id in " .
      "(SELECT following_id FROM user_follows where follower_id = ? " .
      " UNION SELECT users.id from users where users.id = ?) " .
      " ORDER BY created_at DESC;", [auth()->user()->id, auth()->user()->id]);
    return $query;
  }
}
