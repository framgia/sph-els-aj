<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserCategoryResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'description' => $this->description,
      'is_taken' => !empty($this->whenLoaded('isCategoryTaken')),
      'questions' => $this->when(isset($this->questions_count), $this->questions_count),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at
    ];
  }
}
