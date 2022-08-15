<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ActivityLogService
{
  public static function logFollow($idToFollow): void
  {
    auth()->user()->activityLogs()->create([
      'activity_id' => $idToFollow,
      'activity_type' => 'Follow',
      'activity_description' => 'followed',
    ]);
  }

  public static function getLogs(): array
  {
    $ids = DB::table('user_follows')
      ->select('following_id')
      ->where('follower_id', auth()->user()->id)
      ->get()->map(
        fn ($item) =>
        $item->following_id
      )->toArray();
    array_push($ids, auth()->user()->id);
    $idsWithComma = implode(",", array_fill(0, count($ids), '?'));
    $query = DB::select("SELECT activity_logs.* from users INNER JOIN user_follows on users.id = user_follows.follower_id INNER JOIN activity_logs on user_follows.following_id = activity_logs.activity_id and users.id = activity_logs.loggable_id and users.id in ($idsWithComma);", $ids);
    return $query;
  }
}
