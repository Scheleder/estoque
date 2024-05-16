<!DOCTYPE html>
<html class={{ Auth::user()->configuration->dark ? 'dark' : '' }} lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('/ico/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('/ico/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('/ico/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('/ico/site.webmanifest') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Scripts -->
    <script src="{{ asset('/js/jquery.211.min.js') }}"></script>
    <script src="{{ asset('/js/select2.min.js') }}"></script>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('/css/flowbite.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('/css/select2.min.css') }}" />
    @notifyCss
    {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])

</head>

<body class="font-sans dark:bg-black">

    <script src="{{ asset('/js/custom.js') }}"></script>

    <div class="min-h-screen bg-bege dark:bg-gray-500">
        <header class="flex w-full h-20">
            @include('layouts.navigation')
        </header>

        @php
            $search = '';

        @endphp

        <!-- Page Content -->
        <main class="grow overflow-hidden">
            {{ $slot }}
        </main>
        <footer class="h-24">
            @include('layouts.footer')
        </footer>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js"></script>
    <x-notify::notify />
    @notifyJs
</body>

</html>
