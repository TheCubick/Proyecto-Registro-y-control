<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

/**
 * Visita: registro de un ingreso al edificio.
 *
 * Relaciona a un visitante con el departamento destino y con el usuario que
 * registró el acceso. Controla el gafete asignado y las horas de entrada y salida.
 *
 * @property int $id
 * @property int $visitor_id
 * @property int $department_id
 * @property int $user_id Usuario operador que registró la visita.
 * @property string $reason Motivo de la visita.
 * @property string|null $badge_number Número de gafete entregado.
 * @property \Illuminate\Support\Carbon $entry_time Fecha y hora de entrada.
 * @property \Illuminate\Support\Carbon|null $exit_time Fecha y hora de salida; null mientras la persona sigue dentro.
 * @property string $status Estado: dentro, completado o cancelado.
 */
class visits extends Model
{
    use HasFactory;

    protected $table = 'visits';

    protected $fillable = [
        'visitor_id',
        'department_id',
        'user_id',
        'reason',
        'badge_number',
        'entry_time',
        'exit_time',
        'status',
    ];

    /**
     * Convierte las horas de entrada y salida en instancias de Carbon.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'entry_time' => 'datetime',
            'exit_time' => 'datetime',
        ];
    }

    /**
     * Visitante que realiza la visita.
     *
     * @return BelongsTo<visitors, $this>
     */
    public function visitor(): BelongsTo
    {
        return $this->belongsTo(visitors::class);
    }

    /**
     * Departamento destino de la visita.
     *
     * @return BelongsTo<departments, $this>
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(departments::class);
    }

    /**
     * Usuario operador que registró la visita.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
