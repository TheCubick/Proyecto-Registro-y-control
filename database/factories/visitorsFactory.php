<?php

namespace Database\Factories;

use App\Models\visitors;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<visitors>
 */
class visitorsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => fake()->name(),
            'identification_number' => fake()->unique()->numerify('VST-####'),
            'phone' => fake()->phoneNumber(),
        ];
    }
}
