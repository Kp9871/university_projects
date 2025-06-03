<x-structure>
    <x-slot name='title'>
        Your Characters
    </x-slot>
    
    <h2>Character Details</h2>
    
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
            <td><a href="{{ route('detailedCharacter', ['character' => $character->id]) }}">Details</a></td>
            <td><a href="{{ route('editCharacter', ['character' => $character->id]) }}">Edit</a></td>
        </tr>
        @endforeach
    </table>

    <a href="{{ route('createCharacter') }}">Create character</a>

    <br>
    <br>
    <br>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if ($errors->any())
        <div class="alert alert-danger">
            @foreach ($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
    @endif
</x-structure>