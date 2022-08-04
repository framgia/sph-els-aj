<?php

namespace Database\Seeders;

use App\Models\Category;
use Faker\Provider\Lorem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $category = Category::create([
      'title' => 'Category #1',
      'description' => Lorem::text(),
    ]);

    $category->questions()
      ->create([
        'value' => 'How water is written scientifically?'
      ])
      ->options()
      ->createMany([
        ['value' => 'H2O', 'is_correct' => 1],
        ['value' => 'CO2', 'is_correct' => 0],
        ['value' => 'AS2', 'is_correct' => 0],
        ['value' => 'DS2', 'is_correct' => 0]
      ]);

    $category->questions()
      ->create([
        'value' => '________ is the basic unit of all living things?'
      ])
      ->options()
      ->createMany([
        ['value' => 'Blood', 'is_correct' => 0],
        ['value' => 'Cell', 'is_correct' => 1],
        ['value' => 'Organ', 'is_correct' => 0],
        ['value' => 'Disease', 'is_correct' => 0]
      ]);

    $category->questions()
      ->create([
        'value' => 'The square root of 81 is?'
      ])
      ->options()
      ->createMany([
        ['value' => '9', 'is_correct' => 1],
        ['value' => '21', 'is_correct' => 0],
        ['value' => '4', 'is_correct' => 0],
        ['value' => '5', 'is_correct' => 0]
      ]);
  }
}
