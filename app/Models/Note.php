<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Note extends Model
{
    use HasUuids, HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['title', 'content'];

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'note_tag')->withTimestamps();
    }
}
