<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class visitors extends Model
{
    use HasFactory;

    protected $table = 'visitors';

    protected $fillable = [
        'full_name',
        'identification_number',
        'phone',
    ];

    public function visits(): HasMany
    {
        return $this->hasMany(visits::class);
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(
            set: fn (string $value): string => strtolower($value),
            get: fn (string $value): string => ucwords($value),
        );
    }
}
