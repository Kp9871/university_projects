<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'name',
        'enemy',
        'defence',
        'strength',
        'accuracy',
        'magic',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function contests()
    {
        return $this->belongsToMany('App\Models\Contest')
            ->withPivot('hero_hp', 'enemy_hp')
            ->withTimestamps();
    }
}

?>