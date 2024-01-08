<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;
    public function test_get_posts()
    {
        $this->login();

        $response = $this->get('/api/posts');
        $response->assertStatus(200);
    }

    public function test_create_post() {
        $this->login();

        $response = $this->post('/api/posts', [
            'title' => 'Test Post',
            'description' => 'Test Post'
        ]);

        $response->assertStatus(200);

        $this->assertEquals(1, Post::count());

    }

    public function test_update_post() {
        $this->login();

        $response = $this->post('/api/posts', [
            'title' => 'Test Post',
            'description' => 'Test Post'
        ]);
        $post = Post::first();

        $response = $this->post('/api/posts', [
            'title' => 'Updated Title',
            'description' => 'Updated Desc',
            'id' => $post->id
        ]);
        $post = Post::first();
        $response->assertStatus(200);

        $this->assertEquals($post->title, 'Updated Title');
    }

    public function test_delete_post() {
        $this->login();
        $response = $this->post('/api/posts', [
            'title' => 'Test Post',
            'description' => 'Test Post'
        ]);
        $post = Post::first();

        $response = $this->delete('/api/posts/'.$post->id);
        $response->assertStatus(200);

    }
}
