<?php
namespace Tests;
use App\Models\User;

trait UserLogin {
    public function login() {
        $user = User::factory()->create();
        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);
        $this->assertAuthenticated();
    }
}
