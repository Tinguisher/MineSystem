<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(SignupRequest $request){
        // validate $request by going to SignupRequest
        $data = $request -> validated();

        // create a user in the database
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        // get token by using hasApiTokens in User model
        /** @var User $user */
        $token = $user -> createToken('main') -> plainTextToken;

        // return the created user and token
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request){
        // check if the inputs are required etc
        $credentials = $request -> validated();

        // if the the credentials did not passed, send error message and status code 422
        if( !Auth::attempt ( $credentials )){
            return response([
                'message' => 'Incorrect email or password'
            ], 422);
        }
        
        // get the user and its token
        /** @var User $user */
        $user = Auth::user();
        $token = $user -> createToken('main') -> plainTextToken;

        // return the user and token
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request -> user();

        // remove the token
        $user -> currentAccessToken() -> delete;

        return response([]);
    }
}
