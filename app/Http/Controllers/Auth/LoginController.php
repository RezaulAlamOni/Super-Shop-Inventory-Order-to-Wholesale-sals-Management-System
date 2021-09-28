<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Jenssegers\Agent\Agent;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    //protected $redirectTo = '/home';

public function authenticated($request)
{
    $agent = new Agent();

    $platform = 'unknown';
    $user_agent = $request->header('user-agent');
    
    if (preg_match('/linux/i', $user_agent)) {
        $platform = 'linux';
    }
    elseif (preg_match('/macintosh|mac os x/i', $user_agent)) {
        $platform = 'mac';
    }
    elseif (preg_match('/windows|win32/i', $user_agent)) {
        $platform = 'windows';
    }
    elseif (preg_match('/Android|webOS|iPhone|iPod|Blackberry/i', $user_agent)) {
        $platform = 'android';
    }
    if($agent->isMobile()){
        return redirect('android_home');

    }
    if($agent->isPhone()){
        return redirect('android_home');
    }

    return redirect('home');


}

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
