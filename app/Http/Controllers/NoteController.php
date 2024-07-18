<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        $filterTags = request('tag-filter', []);
        $filterSearch = request('search', "");

        $notesQuery = Note::with('tags')->latest();
        $tags = Tag::all();

        if (!empty($filterTags)) {
            $notesQuery->whereHas('tags', function ($query) use ($filterTags) {
                $query->whereIn('tags.id', array_keys($filterTags));
            });
        }

        if (!empty($filterSearch)) {
            $notesQuery
                ->where('title', 'LIKE', "%$filterSearch%")
                ->orWhere('content', 'LIKE', "%$filterSearch%");
        }

        $notes = $notesQuery->simplePaginate(10);

        return Inertia::render('Note/Index', [
            'notes' => $notes->items(),
            'tags' => $tags,
            'filterTags' => array_keys($filterTags)
        ]);
    }

    public function create()
    {
        $tags = Tag::all();
        return Inertia::render('Note/Create', ['tags' => $tags]);
    }

    public function store()
    {
        request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'content' => ['required'],
            'tags' => ['required', 'array']
        ]);

        $note = Note::create([
            'title' => request('title'),
            'content' => request('content'),
        ]);

        $note->tags()->attach(request('tags'));

        $tags = Tag::all();
        return to_route('notes.index', ['tags' => $tags]);
    }
}
