<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class visits extends Model
{
    use HasFactory;

    public function department(): BelongsTo
    {
        return $this->belongsTo(departments::class);
    }
}
