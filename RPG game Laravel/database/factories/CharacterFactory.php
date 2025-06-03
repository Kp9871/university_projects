<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Character>
 */
class CharacterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalPoints = 20;
        $defence = $this->faker->numberBetween(0, 3);
        $totalPoints -= $defence;
        $strength = $this->faker->numberBetween(0, $totalPoints);
        $totalPoints -= $strength;
        $accuracy = $this->faker->numberBetween(0, $totalPoints);
        $totalPoints -= $accuracy;
        $magic = $this->faker->numberBetween(0, $totalPoints);

        return [
            'name' => $this->faker->name,
            'enemy' => false,
            'defence' => $defence,
            'strength' => $strength,
            'accuracy' => $accuracy,
            'magic' => $magic,
            'user_id' => null,
        ];
    }
}
