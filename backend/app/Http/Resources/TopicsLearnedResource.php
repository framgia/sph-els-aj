<?php

namespace App\Http\Resources;

use App\Http\Resources\User\LessonResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicsLearnedResource extends JsonResource
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
      'category' => new CategoryResource($this->whenLoaded('category')),
      'question' => new QuestionResource($this->whenLoaded('question')),
      'option' => new OptionResource($this->whenLoaded('option')),
    ];
  }
}
