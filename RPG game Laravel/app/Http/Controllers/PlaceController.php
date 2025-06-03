<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!auth()->user()->admin)
        {
            return redirect()->route('index')->with('error', 'Access denied.');
        }

        $places = Place::all();

        return view('places', compact('places'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->admin)
        {
            return redirect()->route('index')->with('error', 'Access denied.');
        }

        return view('createPlace');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = $request->file('image')->store('public/places');

        Place::create([
            'name' => $validatedData['name'],
            'image' => $imagePath,
        ]);

        return redirect()->route('places')->with('success', 'Place created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Place $place)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Place $place)
    {
        if (!auth()->user()->admin) {
            return redirect()->route('index')->with('error', 'Access denied.');
        }

        return view('editPlace', compact('place'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        if (!auth()->user()->admin) {
            return redirect()->route('index')->with('error', 'Access denied.');
        }

        $validatedData = $request->validate([
            'name' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/places');
            Storage::delete($place->image);
            $place->image = $imagePath;
        }

        $place->name = $validatedData['name'];
        $place->save();

        return redirect()->route('places')->with('success', 'Place updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        if (!auth()->user()->admin) {
            return redirect()->route('index')->with('error', 'Access denied.');
        }

        Storage::delete($place->image);

        $place->delete();

        return redirect()->route('places')->with('success', 'Place deleted successfully.');
    }
}
