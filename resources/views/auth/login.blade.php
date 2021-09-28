<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{__('messages.login_title')}}</title>
    <link rel="shortcut icon" href="<?php echo(\Config::get('app.url') . '/public/backend/images/logo/favicon.ico');?>">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/css/flag-icon.css">
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
   
    
    <!------ Include the above in your HEAD tag ---------->
    <style>
       
        /* STRUCTURE */

        .wrapper {
        display: flex;
        align-items: center;
        flex-direction: column; 
        justify-content: center;
        width: 100%;
        min-height: 100%;
        padding: 20px;
        }

        #formContent {
        -webkit-border-radius: 10px 10px 10px 10px;
        border-radius: 10px 10px 10px 10px;
        background: #fff;
        padding: 30px;
        width: 90%;
        max-width: 450px;
        position: relative;
        padding: 0px;
        -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
        text-align: center;
        }

        #formFooter {
        background-color: #f6f6f6;
        border-top: 1px solid #dce8f1;
        padding: 25px;
        text-align: center;
        -webkit-border-radius: 0 0 10px 10px;
        border-radius: 0 0 10px 10px;
        }



        /* TABS */

        h2.inactive {
        color: #cccccc;
        }

        h2.active {
        color: #0d0d0d;
        border-bottom: 2px solid #5fbae9;
        }



        /* FORM TYPOGRAPHY*/

        input[type=button], input[type=submit], input[type=reset]  {
        background-color: #56baed;
        border: none;
        color: white;
        padding: 15px 80px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        text-transform: uppercase;
        font-size: 13px;
        -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
        box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
        margin: 5px 20px 40px 20px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        }

        input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
        background-color: #39ace7;
        }

        input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
        -moz-transform: scale(0.95);
        -webkit-transform: scale(0.95);
        -o-transform: scale(0.95);
        -ms-transform: scale(0.95);
        transform: scale(0.95);
        }

        input[type=text], input[type=email], input[type=password] {
        background-color: #f6f6f6;
        border: none;
        color: #0d0d0d;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 5px;
        width: 85%;
        border: 2px solid #f6f6f6;
        -webkit-transition: all 0.5s ease-in-out;
        -moz-transition: all 0.5s ease-in-out;
        -ms-transition: all 0.5s ease-in-out;
        -o-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
        }

        input[type=text]:focus, input[type=email]:focus, input[type=password]:focus {
        background-color: #fff;
        border-bottom: 2px solid #5fbae9;
        }

        input[type=text]:placeholder, input[type=email]:placeholder, input[type=password]:placeholder {
        color: #cccccc;
        }



        /* ANIMATIONS */

        /* Simple CSS3 Fade-in-down Animation */
        .fadeInDown {
        -webkit-animation-name: fadeInDown;
        animation-name: fadeInDown;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        }

        @-webkit-keyframes fadeInDown {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
        }

        @keyframes fadeInDown {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
        }

        /* Simple CSS3 Fade-in Animation */
        @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

        .fadeIn {
        opacity:0;
        -webkit-animation:fadeIn ease-in 1;
        -moz-animation:fadeIn ease-in 1;
        animation:fadeIn ease-in 1;

        -webkit-animation-fill-mode:forwards;
        -moz-animation-fill-mode:forwards;
        animation-fill-mode:forwards;

        -webkit-animation-duration:1s;
        -moz-animation-duration:1s;
        animation-duration:1s;
        }

        .fadeIn.first {
        -webkit-animation-delay: 0.4s;
        -moz-animation-delay: 0.4s;
        animation-delay: 0.4s;
        }

        .fadeIn.second {
        -webkit-animation-delay: 0.6s;
        -moz-animation-delay: 0.6s;
        animation-delay: 0.6s;
        }

        .fadeIn.third {
        -webkit-animation-delay: 0.8s;
        -moz-animation-delay: 0.8s;
        animation-delay: 0.8s;
        }

        .fadeIn.fourth {
        -webkit-animation-delay: 1s;
        -moz-animation-delay: 1s;
        animation-delay: 1s;
        }

        /* Simple CSS3 Fade-in Animation */
        .underlineHover:after {
        display: block;
        left: 0;
        bottom: -10px;
        width: 0;
        height: 2px;
        background-color: #56baed;
        content: "";
        transition: width 0.2s;
        }

        .underlineHover:hover {
        color: #0d0d0d;
        }

        .underlineHover:hover:after{
        width: 100%;
        }

        h1, h3{
            color:#60a0ff;
        }

        /* OTHERS */

        *:focus {
            outline: none;
        } 

        #icon {
        width:30%;
        }
        .lgin_logo {
            padding-top: 15px;
        }
    </style>
</head>
<body>


        <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
                <div class="collapse navbar-collapse" id="navbarsExample09">
                        <ul class="navbar-nav border-left flex-row ">
                                <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle text-nowrap px-3" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            @if(App::isLocale('ja'))
                                            <span class="flag-icon flag-icon-jp"></span> 日本語
                                            @elseif(App::isLocale('en'))
                                            <span class="flag-icon flag-icon-us"></span> English
                                            @endif
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-small" aria-labelledby="navbarDropdown">
                                            <a class="dropdown-item" href="<?php echo(\Config::get('app.url').'/language/en');?>"><span class="flag-icon flag-icon-us"></span> English</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="<?php echo(\Config::get('app.url').'/language/ja');?>"><span class="flag-icon flag-icon-jp"></span> 日本語</a>
                                        </div>
                                    </li>
                        </ul>
                    
                </div>
            </nav>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->
    
    <!-- Icon -->
    <div class="fadeIn first">
      <img src="<?php echo(\Config::get('app.url').'/public/dashboard/logo')?>/jacos_logo.png" id="icon" alt="User Icon" class="lgin_logo" />
      
    </div><br/>
    <!-- Login Form -->
    <form method="POST" action="<?php echo(\Config::get('app.url').'/login')?>">
    @csrf
    <input id="email" type="email" placeholder="{{ __('messages.email_text') }}" class="fadeIn second{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
    @if ($errors->has('email'))
                <span class="invalid-feedback" role="alert" style="display:block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
   @endif
    
   
    <input id="password" type="password" class="fadeIn third{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" placeholder="{{ __('messages.password_text') }}" required>

    @if ($errors->has('password'))
        <span class="invalid-feedback" role="alert" style="display:block">
            <strong>{{ $errors->first('password') }}</strong>
        </span>
    @endif
    <div class="form-group row">
        <div class="col-md-6 offset-md-4">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                <label class="form-check-label" for="remember">
                    {{ __('messages.remember_text') }}
                </label>
            </div>
        </div>
    </div>
    
      <input type="submit" class="fadeIn fourth" value="{{ __('messages.login_text') }}">
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
    @if (Route::has('password.request'))
        <a class="underlineHover" href="<?php echo(\Config::get('app.url').'/password/reset')?>">
            {{-- {{ __('messages.forgot_pass_text') }} --}}
            @lang('messages.forgot_pass_text')
        </a>
    @endif
      <!-- <a class="underlineHover" href="#">Go to the Site</a> -->
    </div>

  </div>
</div>
    <script>
        $(document).ready(function(){
            

        });
    </script>
</body>
</html>