<?php

namespace Database\Factories;

use App\Models\departments;
use App\Models\User;
use App\Models\visitors;
use App\Models\visits;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<visits>
 */
class visitsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visitor_id' => visitors::factory(),
            'department_id' => departments::factory(),
            'user_id' => User::factory(),
            'reason' => fake()->randomElement([
                'Reunión de trabajo',
                'Entrega de documentación',
                'Mantenimiento de equipos',
                'Presentación de propuesta',
            ]),
            'badge_number' => fake()->unique()->numerify('GAF-##'),
            'entry_time' => now()->subHours(fake()->numberBetween(1, 48)),
            'exit_time' => null,
            'status' => 'dentro',
        ];
    }
}
