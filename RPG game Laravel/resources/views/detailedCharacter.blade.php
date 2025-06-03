<x-structure>
    <x-slot name='title'>
        Details
    </x-slot>

    <table>
        <tr>
            <th>Name</th>
            <th>Defence</th>
            <th>Strength</th>
            <th>Accuracy</th>
            <th>Magic</th>
        </tr>
        <tr>
            <td>{{ $character->name }}</td>
            <td>{{ $character->defence }}</td>
            <td>{{ $character->strength }}</td>
            <td>{{ $character->accuracy }}</td>
            <td>{{ $character->magic }}</td>
        </tr>
    </table>

    <h3>Matches</h3>

    <table>
        <tr>
            <th>Contest ID</th>
            <th>Location</th>
            <th>Enemy Character</th>
        </tr>
        <tr>
            @foreach($contests as $contest)
                <td>{{ $contest->id }}</td>
                <td>{{ $contest->place->name }}</td>
                <td>{{ $contest->characters->where('id', '!=', $character->id)->first()->name }}</td>
            @endforeach
        </tr>
    </table>
</x-structure>