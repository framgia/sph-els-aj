<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class OptionService
{
  public static function updateOptions(array $options): void
  {
    $caseValue = 'case';
    $caseIsCorrect = 'case';
    $ids = '';
    foreach ($options as $value) {
      $id = $value['id'];
      $displayValue = $value['value'];
      $displayIsCorrect = $value['is_correct'];
      $caseValue .= " when id = $id then \"$displayValue\"";
      $caseIsCorrect .= " when id = $id then \"$displayIsCorrect\"";
      $ids .= " $id,";
    }
    $ids = trim($ids, ",");
    DB::update("UPDATE options SET value = $caseValue END, is_correct = $caseIsCorrect END WHERE id in ($ids)");
  }
}
