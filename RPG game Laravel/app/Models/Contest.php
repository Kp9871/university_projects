<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contest extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'win',
        'history',
        'place_id',
    ];

    protected $casts = [
        'win' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function place()
    {
        return $this->belongsTo('App\Models\Place');
    }

    public function characters()
    {
        return $this->belongsToMany('App\Models\Character')
            ->withPivot('hero_hp', 'enemy_hp')
            ->withTimestamps();
    }
}

?>