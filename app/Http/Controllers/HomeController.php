<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $favorites = Note::where('favorite', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->select('id', 'title', 'favorite')
            ->with('tags:id,name')
            ->get();

        return Inertia::render('Home', [
            'favoriteNotes' => $favorites ?? [],
            'lastActivities' => [],
        ]);
    }
}
