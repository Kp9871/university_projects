<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Character;
use App\Models\Place;
use App\Models\Contest;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(5)->create();

        foreach ($users as $user)
        {
            $characters = Character::factory(3)->create(['user_id' => $user->id]);
        }

        $places = Place::factory(5)->create();

        foreach ($places as $place)
        {
            $randomCharacters = Character::all()->random(2);

            $existingContest = Contest::where('place_id', $place->id)->first();

            if (!$existingContest)
            {
                $contest = Contest::factory()->create([
                    'win' => rand(0, 1) ? true : false,
                    'history' => 'Mérkőzés története...',
                    'place_id' => $place->id,
                ]);

                $contest->characters()->attach([
                    $randomCharacters[0]->id => ['hero_hp' => 20, 'enemy_hp' => 20],
                    $randomCharacters[1]->id => ['hero_hp' => 20, 'enemy_hp' => 20],
                ]);
            }
        }
    }
}
