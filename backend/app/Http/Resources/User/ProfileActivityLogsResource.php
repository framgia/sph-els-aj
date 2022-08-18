<?php

namespace App\Http\Resources\User;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileActivityLogsResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $description = $this->getUser($this->loggable_id) . " ";
    $description .= $this->activity_description;
    if ($this->activity_type === "Follow") {
      $description .= ' ' . $this->getUser($this->activity_id);
    }
    return [
      'id' => $this->id,
      'description' => $description,
      'created_at' => \Carbon\Carbon::parse($this->created_at)->diffForHumans()
    ];
  }

  private function getUser($id)
  {
    if ($id === auth()->user()->id) {
      return 'You';
    } else {
      return User::find($id)->name;
    }
  }
}
