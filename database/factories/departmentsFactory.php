<?php

namespace Database\Factories;

// busca la tabla a la cual insertará datos
use App\Models\departments;
// libreria para factory
use Illuminate\Database\Eloquent\Factories\Factory;
// herramienta para crear textos
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Attributes\UseFactory;


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
            'name' => fake()->name(),
            'building_floor' => fake()->randomElement([
                'Edificio A | Recursos Humanos',
                'Edificio B | Desarrollo de Software',
                'Edificio B | Arquitectura',
                'Edificio C | Dirección General'
            ]),
        ];
    }
}
