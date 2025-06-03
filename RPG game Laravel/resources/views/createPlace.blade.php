<x-structure>
    <x-slot name='title'>
        Create New Place
    </x-slot>

    <h2>Create a New Place</h2>

    <form method="POST" action="{{ route('places.store') }}" enctype="multipart/form-data">
        @csrf

        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div>
            <label for="image">Image:</label>
            <input type="file" id="image" name="image" required>
        </div>

        <button type="submit">Create Place</button>
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