<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <nav>
        @auth
            <a href="{{ route('dashboard') }}">My Page</a>
            <a href="{{ route('logout') }}">Logout</a>
        @else
            <a href="{{ route('login') }}">Login</a>
            <a href="{{ route('register') }}">Register</a>
        @endauth
    </nav>
    <hr>
    <nav>
        <a href="{{ route('index') }}">Home</a>
        @auth
            <a href="{{ route('personalCharacters', ['userId' => auth()->id()]) }}">My Characters</a>
            <a href="{{ route('allCharacters') }}">All characters</a>
        @endauth
        @if (auth()->check() && auth()->user()->admin)
            <a href="{{ route('places') }}">Locations</a>
        @endif
    </nav>
    <hr>
    <h1>{{ $title ?? ' ' }}</h1>

    {{ $slot }}

</body>
</html>