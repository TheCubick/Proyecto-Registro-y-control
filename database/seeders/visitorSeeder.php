<?php

namespace Database\Seeders;

use App\Models\visitors;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class visitorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $visitor = new visitors();
        $visitor->full_name = 'Pablo Ramirez';
        $visitor->identification_number = 'VST-1001';
        $visitor->phone = '555-0101';
        $visitor->save();

        $visitor = new visitors();
        $visitor->full_name = 'Mariana Torres';
        $visitor->identification_number = 'VST-1002';
        $visitor->phone = '555-0102';
        $visitor->save();

        $visitor = new visitors();
        $visitor->full_name = 'Jose Orantes';
        $visitor->identification_number = 'VST-1003';
        $visitor->phone = '555-0103';
        $visitor->save();

        $visitor = new visitors();
        $visitor->full_name = 'Sofia Herrera';
        $visitor->identification_number = 'VST-1004';
        $visitor->phone = '555-0104';
        $visitor->save();

        $visitor = new visitors();
        $visitor->full_name = 'Diego Navarro';
        $visitor->identification_number = 'VST-1005';
        $visitor->phone = '555-0105';
        $visitor->save();

        $visitor = new visitors();
        $visitor->full_name = 'Ivanna Castillo';
        $visitor->identification_number = 'VST-1006';
        $visitor->phone = '555-0106';
        $visitor->save();
    }
}
