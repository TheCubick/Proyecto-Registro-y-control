<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Usuario operador del sistema (administrador, recepción o guardia).
 *
 * La columna `role` (enum: admin | recepcion | guardia) definida en la migración
 * es la base del Control de Acceso Basado en Roles (RBAC). Cada visita registra
 * al usuario responsable mediante `visits.user_id`.
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password Hash generado automáticamente por el cast `hashed`.
 * @property string $role Rol del usuario: admin, recepcion o guardia.
 */
#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
