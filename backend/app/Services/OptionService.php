<?php

namespace App\Services;

use App\Models\Option;
use Illuminate\Support\Facades\DB;

class OptionService
{
  public static function updateOptions(int $question_id, array $requestOptions): void
  {
    $options = [];
    foreach ($requestOptions as $option) {
      $options[] = [
        'id' => $option['id'],
        'value' => $option['value'],
        'question_id' => $question_id,
        'is_correct' => $option['is_correct']
      ];
    }
    (new self)->deleteOptions($question_id, $requestOptions);
    Option::upsert($options, ['id'], ['value', 'is_correct']);
  }

  private function deleteOptions(int $question_id, array $requestOptions): void
  {
    $options = collect($requestOptions)->map(function ($option) {
      return $option['id'];
    })->filter()->implode(",");
    DB::delete("DELETE from options WHERE question_id = $question_id AND id NOT IN ($options)");
  }
}
