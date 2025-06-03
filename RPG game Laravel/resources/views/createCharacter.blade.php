<x-structure>
    <x-slot name='title'>
        Create New Character
    </x-slot>

    <h2>Create a New Character</h2>

    <form method="POST" action="{{ route('characters/store') }}">
        @csrf

        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div>
            <label for="defence">Defence:</label>
            <input type="number" id="defence" name="defence" required>
        </div>

        <div>
            <label for="strength">Strength:</label>
            <input type="number" id="strength" name="strength" required>
        </div>

        <div>
            <label for="accuracy">Accuracy:</label>
            <input type="number" id="accuracy" name="accuracy" required>
        </div>

        <div>
            <label for="magic">Magic:</label>
            <input type="number" id="magic" name="magic" required>
        </div>

        @if (Auth::user()->admin)
            <div>
                <label for="enemy">Enemy:</label>
                <input type="checkbox" id="enemy" name="enemy" {{ old('enemy') || isset($character) && $character->enemy ? 'checked' : '' }}>
            </div>
        @endif

        <button type="submit">Create Character</button>
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