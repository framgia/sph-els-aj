<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    public function store(Request $request)
    {
        Category::create($request->validated());
        return response()->json([
            'message' => 'New Category created.'
        ]);
    }

    public function show(Category $category)
    {
        return new CategoryResource(Category::find($category->id));
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return response()->json([
            'category' => $category,
            'message' => 'Category has been updated'
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'message' => 'Category has been deleted'
        ]);
    }
}
