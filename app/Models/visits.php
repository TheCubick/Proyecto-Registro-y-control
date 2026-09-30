<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

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

    protected function casts(): array
    {
        return [
            'entry_time' => 'datetime',
            'exit_time' => 'datetime',
        ];
    }

    public function visitor(): BelongsTo
    {
        return $this->belongsTo(visitors::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(departments::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
