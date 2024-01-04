<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::all();
        return response()->json(['success' => true, 'data' => $posts]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);
        try {
            $post = $request->id ? Post::find($request->id) : new Post();
            $post->title = $request->title;
            $post->post = $request->description;
            $post->save();
            return response()->json(['success' => true, 'message' => 'Post updated successfully']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function destroy($post)
    {
        try {
           Post::find($post)->delete();
           return response()->json(['success' => true, 'message' => 'Post deleted successfully']);
        } catch(Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
