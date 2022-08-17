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
    $description = 'learned ' . (new self)->getLearnedTopics($data) . ' of ' . count($data) .
      ' topics in ' . $category->title;
    auth()->user()->activityLogs()->create([
      'activity_id' => $category->id,
      'activity_type' => 'Learned',
      'activity_description' => $description,
    ]);
  }

  private function getLearnedTopics(array $data): int
  {
    $learnedTopics = 0;
    foreach ($data as $item) {
      $learnedTopics += $item['is_correct'];
    }
    return $learnedTopics;
  }

  public static function getLogs(): array
  {
    // Get all the followed users of the authenticated user in an array
    // Ex: [3, 4, 6]
    $ids = DB::table('user_follows')
      ->select('following_id')
      ->where('follower_id', auth()->user()->id)
      ->get()->map(
        fn ($item) =>
        $item->following_id
      )->toArray();

    // Adds the authenticated user's id to the array. Ex: [3, 4, 6, 1]
    array_push($ids, auth()->user()->id);

    // Adds a comma in between the id's and returns a string. 
    // Ex: "3, 4, 6, 1" 
    $idsWithComma = implode(",", array_fill(0, count($ids), '?'));
    
    // Executes the query to get all of the logs present in the array and returns it
    $query = DB::select("SELECT activity_logs.* from users INNER JOIN activity_logs on users.id = activity_logs.loggable_id and users.id in ($idsWithComma)", $ids);
    return $query;
  }
}
