<x-structure>
    <x-slot name='title'>
        All Characters
    </x-slot>

    <table>
        <tr>
            <th>Name</th>
            <th>Defence</th>
            <th>Strength</th>
            <th>Accuracy</th>
            <th>Magic</th>
        </tr>
        @foreach ($characters as $character)
        <tr>
            <td>{{ $character->name }}</td>
            <td>{{ $character->defence }}</td>
            <td>{{ $character->strength }}</td>
            <td>{{ $character->accuracy }}</td>
            <td>{{ $character->magic }}</td>
        </tr>
        @endforeach
    </table>
</x-structure>