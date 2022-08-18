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
    $description = $this->getUser($this->loggable_id)['name'] . " ";
    $description .= $this->activity_description;
    if ($this->activity_type === "Follow") {
      $description .= ' ' . $this->getUser($this->activity_id)['name'];
    }
    
    return [
      'avatar' => $this->getUser($this->loggable_id)['avatar'],
      'description' => $description,
      'created_at' => \Carbon\Carbon::parse($this->created_at)->diffForHumans()
    ];
  }

  public function getUser($id)
  {
    if ($id === auth()->user()->id) {
      $name = 'You';
      $avatar = auth()->user()->media()
      ->where('collection_name', 'avatar')->first()->getUrl();
    } else {
      $user = User::find($id);
      $name = $user->name;
      $avatar = $user->media()->where('collection_name', 'avatar')->first()->getUrl();
    }

    return [
      'name' => $name,
      'avatar' => $avatar,
    ];      
  }
}
