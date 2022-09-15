<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Character extends Model
{
    use HasFactory;
    protected $fillable = ['firstname', 'lastname', 'family'];

    public function family(): BelongsTo
    {
        return $this->BelongsTo(Family::class, 'family');
    }
}
