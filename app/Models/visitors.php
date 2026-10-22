<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * Visitante: persona externa que ingresa al edificio.
 *
 * @property int $id
 * @property string $full_name Nombre completo (se almacena en minúsculas).
 * @property string $identification_number Número de identificación oficial, único por validación.
 * @property string|null $phone Teléfono de contacto.
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class visitors extends Model
{
    use HasFactory;

    protected $table = 'visitors';

    protected $fillable = [
        'full_name',
        'identification_number',
        'phone',
    ];

    /**
     * Historial de visitas realizadas por este visitante.
     *
     * @return HasMany<visits, $this>
     */
    public function visits(): HasMany
    {
        return $this->hasMany(visits::class);
    }

    /**
     * Normaliza el nombre completo del visitante.
     *
     * Mutador: lo guarda en minúsculas. Accesor: lo devuelve en formato título (`ucwords`).
     *
     * @return Attribute<string, string>
     */
    protected function fullName(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): string => strtolower($value),
            get: fn (string $value): string => ucwords($value),
        );
    }
}
