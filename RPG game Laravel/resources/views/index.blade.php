<x-structure>
    <x-slot name='title'>
        Welcome to our RPG Game!
    </x-slot>
    <p>In this RPG game, you can create and control characters and pit them against each other in various contests.</p>

    <h2>Statistics:</h2>
    <ul>
        <li>Total Characters: {{ $characterCount }}</li>
        <li>Total Contests: {{ $contestCount }}</li>
    </ul>
</x-structure>