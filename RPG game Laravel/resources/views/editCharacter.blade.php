<x-structure>
    <x-slot name='title'>
        Create New Character
    </x-slot>

    <h2>Edit Character</h2>

    <form method="POST" action="{{ route('characters.update', $character) }}">
        @csrf
        @method('PUT')

        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="{{ old('name', $character->name) }}" required>
        </div>

        <div>
            <label for="defence">Defence:</label>
            <input type="number" id="defence" name="defence" value="{{ old('defence', $character->defence) }}" required>
        </div>

        <div>
            <label for="strength">Strength:</label>
            <input type="number" id="strength" name="strength" value="{{ old('strength', $character->strength) }}" required>
        </div>

        <div>
            <label for="accuracy">Accuracy:</label>
            <input type="number" id="accuracy" name="accuracy" value="{{ old('accuracy', $character->accuracy) }}" required>
        </div>

        <div>
            <label for="magic">Magic:</label>
            <input type="number" id="magic" name="magic" value="{{ old('magic', $character->magic) }}" required>
        </div>

        @if (Auth::user()->admin)
            <div>
                <label for="enemy">Enemy:</label>
                <input type="checkbox" id="enemy" name="enemy" {{ $character->enemy ? 'checked' : '' }}>
            </div>
        @endif

        <button type="submit">Update Character</button>
    </form>

    <br>
    <br>
    <br>

    <form method="POST" action="{{ route('characters.destroy', $character) }}">
        @csrf
        @method('DELETE')
        <button type="submit" onclick="return confirm('Are you sure you want to delete this character?')">Delete Character</button>
    </form>

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
