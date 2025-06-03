<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Contest;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Character $character)
    {
        $contests = $character->contests;

        $contests->load('place', 'characters');

        return view('detailedCharacter', compact('character', 'contests'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('createCharacter');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'defence' => 'required|integer|between:0,3',
            'strength' => 'required|integer|between:0,20',
            'accuracy' => 'required|integer|between:0,20',
            'magic' => 'required|integer|between:0,20',
            'enemy' => 'in:on,true,false',
        ]);

        $totalPoints = $request->defence + $request->strength + $request->accuracy + $request->magic;
        if ($totalPoints > 20)
        {
            return redirect()->back()->withErrors(['total_points' => 'The total attribute points cannot exceed 20.'])->withInput();
        }

        $user = auth()->user();

        $character = new Character();
        $character->name = $request->name;
        $character->defence = $request->defence;
        $character->strength = $request->strength;
        $character->accuracy = $request->accuracy;
        $character->magic = $request->magic;
        
        if ($user->admin)
        {
            $character->enemy = $request->has('enemy') ? true : false;
        }
        else
        {
            $character->enemy = false;
        }        

        $character->user_id = $user->id;
        $character->save();

        return redirect()->route('personalCharacters', ['userId' => auth()->id()])->with('success', 'Character created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Character $character)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Character $character)
    {
        if ($character->defence < 0 || $character->defence > 3 ||
            $character->strength < 0 || $character->strength > 20 ||
            $character->accuracy < 0 || $character->accuracy > 20 ||
            $character->magic < 0 || $character->magic > 20)
        {
            return redirect()->back()->withErrors(['validation_error' => 'Invalid character attributes.'])->withInput();
        }

        $totalPoints = $character->defence + $character->strength + $character->accuracy + $character->magic;
        if ($totalPoints > 20)
        {
            return redirect()->back()->withErrors(['total_points' => 'The total attribute points cannot exceed 20.'])->withInput();
        }

        return view('editCharacter', compact('character'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Character $character)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'defence' => 'required|integer|between:0,3',
            'strength' => 'required|integer|between:0,20',
            'accuracy' => 'required|integer|between:0,20',
            'magic' => 'required|integer|between:0,20',
            'enemy' => 'in:on,true,false',
        ]);

        $user = auth()->user();

        $character->name = $request->name;
        $character->defence = $request->defence;
        $character->strength = $request->strength;
        $character->accuracy = $request->accuracy;
        $character->magic = $request->magic;

        if ($user->admin)
        {
            $character->enemy = $request->has('enemy') ? true : false;
        }
        else
        {
            $character->enemy = false;
        }

        $character->save();

        return redirect()->route('personalCharacters', ['userId' => auth()->id()])->with('success', 'Character updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Character $character)
    {
        $user = auth()->user();

        if ($user->id === $character->user_id || ($user->admin && $character->enemy))
        {
            $character->delete();
            return redirect()->route('personalCharacters', ['userId' => auth()->id()])->with('success', 'Character deleted successfully!');
        }
        else
        {
            return redirect()->route('personalCharacters', ['userId' => auth()->id()])->with('error', 'You are not authorized to delete this character!');
        }
    }
}
