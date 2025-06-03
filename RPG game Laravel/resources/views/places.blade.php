<x-structure>
    <x-slot name='title'>
        Locations
    </x-slot>
    
    <h1>Locations List</h1>

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            @foreach($places as $place)
                <tr>
                    <td>{{ $place->name }}</td>
                    <td>
                        @if (Str::startsWith($place->image, 'public'))
                            <img src="{{ Storage::url($place->image) }}" alt="{{ $place->name }}" style="width: 100px;">
                        @else
                            <img src="{{ $place->image }}" alt="{{ $place->name }}" style="width: 100px;">
                        @endif
                    </td>
                    <td><a href="{{ route('editPlace', ['place' => $place->id]) }}">Edit</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <a href="{{ route('createPlace') }}">Create place</a>

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