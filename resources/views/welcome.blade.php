<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @notifyCss
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="antialiased bg-claro">

        <div class="relative bg-gradient-to-r from-claro to-cinza-claro">
            @if (Route::has('login'))
                <div class="top-0 right-0 p-6 text-right">
                    @auth
                        <a href="{{ url('/dashboard') }}" class="font-semibold text-cor-70 hover:text-cor-70/75 focus:outline focus:outline-2 focus:rounded-sm>{{ __("Dashboard") }}</a>
                    @else
                        <a href="{{ route('login') }}" class="mx-8 font-semibold text-cor-70 hover:text-cor-70/75 focus:outline focus:outline-2 focus:rounded-sm">{{ __("Login") }}</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="font-semibold text-cor-70 hover:text-cor-70/75 focus:outline focus:outline-2 focus:rounded-sm">{{ __("Register") }}</a>
                        @endif
                    @endauth
                </div>

            @endif
        </div>
        <div class="grid justify-items-center max-w-7xl m-0 p-6 lg:p-8">
            @if(session('msg'))
            <p class="text-red-600 text-center">{{session('msg')}}</p>
            @endif
            <img class="w-auto" src="/img/animate.gif" alt="ByeMoney">
        </div>
    </body>
</html>
