<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Project;
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

        $lastActivity = Project::orderBy('updated_at', 'desc')
            ->first();

        return Inertia::render('Home', [
            'favoriteNotes' => $favorites ?? [],
            'lastActivity' => $lastActivity,
        ]);
    }
}
