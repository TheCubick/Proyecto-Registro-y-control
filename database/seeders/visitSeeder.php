<?php

namespace Database\Seeders;

use App\Models\departments;
use App\Models\User;
use App\Models\visits;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class visitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'guardia@registro.test')->firstOrFail();

        $department = departments::where('name', 'desarrollo')->firstOrFail();
        $visits = new visits();
        $visits->visitor_id = 1;
        $visits->department_id = $department->id;
        $visits->user_id = $user->id;
        $visits->reason = 'Mantenimiento de red y cableado estructurado';
        $visits->badge_number = 'GAF-01';
        $visits->entry_time = Carbon::now()->subHours(2);
        $visits->exit_time = null;
        $visits->status = 'dentro';
        $visits->save();

        $department = departments::where('name', 'soporte técnico')->firstOrFail();
        $visits = new visits();
        $visits->visitor_id = 1;
        $visits->department_id = $department->id;
        $visits->user_id = $user->id;
        $visits->reason = 'Revisión y mantenimiento de equipos informáticos';
        $visits->badge_number = 'GAF-02';
        $visits->entry_time = Carbon::now()->subDays(1)->subHours(4);
        $visits->exit_time = Carbon::now()->subDays(1);
        $visits->status = 'completado';
        $visits->save();

        $department = departments::where('name', 'sistemas')->firstOrFail();
        $visits = new visits();
        $visits->visitor_id = 1;
        $visits->department_id = $department->id;
        $visits->user_id = $user->id;
        $visits->reason = 'Instalación y configuración de servidores';
        $visits->badge_number = 'GAF-03';
        $visits->entry_time = Carbon::now()->subHours(6);
        $visits->exit_time = Carbon::now()->subHours(3);
        $visits->status = 'completado';
        $visits->save();

        $department = departments::where('name', 'recursos humanos')->firstOrFail();
        $visits = new visits();
        $visits->visitor_id = 1;
        $visits->department_id = $department->id;
        $visits->user_id = $user->id;
        $visits->reason = 'Entrega de documentación laboral';
        $visits->badge_number = 'GAF-04';
        $visits->entry_time = Carbon::now()->subDays(2)->subHours(2);
        $visits->exit_time = Carbon::now()->subDays(2);
        $visits->status = 'completado';
        $visits->save();

        $department = departments::where('name', 'administración')->firstOrFail();
        $visits = new visits();
        $visits->visitor_id = 1;
        $visits->department_id = $department->id;
        $visits->user_id = $user->id;
        $visits->reason = 'Revisión de documentación administrativa';
        $visits->badge_number = 'GAF-05';
        $visits->entry_time = Carbon::now()->subHours(1);
        $visits->exit_time = null;
        $visits->status = 'dentro';
        $visits->save();

        $department = departments::where('name', 'arquitectura')->firstOrFail();
        $visits = new visits();
        $visits->visitor_id = 1;
        $visits->department_id = $department->id;
        $visits->user_id = $user->id;
        $visits->reason = 'Presentación de planos y propuesta de diseño';
        $visits->badge_number = 'GAF-06';
        $visits->entry_time = Carbon::now()->subDays(3)->subHours(3);
        $visits->exit_time = Carbon::now()->subDays(3);
        $visits->status = 'completado';
        $visits->save();
    }
}
