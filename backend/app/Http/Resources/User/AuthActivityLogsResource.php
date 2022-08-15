<?php

namespace App\Http\Resources\User;

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthActivityLogsResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $desc = $this->getUser($this->loggable_id) . " ";
    $desc .= $this->activity_description . " ";
    if ($this->loggable_type === "App\Models\User") {
      $desc .= $this->getUser($this->activity_id);
    }

    return [
      'description' => $desc
    ];
  }

  public function getUser($id)
  {
    return $id === auth()->user()->id ? "You" :
      User::find($id)->name;
  }
}
