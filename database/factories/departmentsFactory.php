<?php

namespace Database\Factories;

use App\Models\departments;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<departments>
 */
class departmentsFactory extends Factory

{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Desarrollo',
                'Soporte Técnico',
                'Sistemas',
                'Recursos Humanos',
                'Administración',
                'Arquitectura',
            ]),
            'building_floor' => fake()->randomElement([
                'Edificio A',
                'Edificio B',
                'Edificio C',
            ]),
        ];
    }
}
