<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Character;
use App\Models\Contest;

class ViewController extends Controller
{
    public function dashboard()
    {
        return view('dashboard'); 
    }

    public function index()
    {
        $characterCount = Character::count();
        $contestCount = Contest::count();

        return view('index', compact('characterCount', 'contestCount'));
    }

    public function personalCharacters()
    {
        $characters = Auth::user()->characters;

        return view('personalCharacters', ['characters' => $characters]);
    }

    public function allCharacters()
    {
        $characters = Character::all();

        return view('allCharacters', compact('characters')); 
    }
}
