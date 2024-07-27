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
        $filterTags = request('filterTags', []);
        $filterSearch = request('search', "");

        $notesQuery = Note::with('tags')->latest();
        $tags = Tag::all();

        if (!empty($filterTags)) {
            $notesQuery->whereHas('tags', function ($query) use ($filterTags) {
                $query->whereIn('tags.id', $filterTags);
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
            'filterTags' => array_map('intval', $filterTags),
            'filterSearch' => $filterSearch,
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

        return to_route('notes.index');
    }

    public function show(Note $note)
    {
        $note->tags; // just this make note to have tags attr
        return Inertia::render('Note/Show', ['note' => $note]);
    }

    public function edit(Note $note)
    {
        $tags = Tag::all();
        $noteTagIds = $note->tags->pluck('id')->toArray();

        return Inertia::render('Note/Edit', ['note' => $note, 'noteTagIds' => $noteTagIds, 'tags' => $tags]);
    }

    public function update(Note $note)
    {
        request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'content' => ['required'],
            'tags' => ['required', 'array']
        ]);

        $note->update([
            'title' => request('title'),
            'content' => request('content')
        ]);

        $note->tags()->sync(request('tags'));

        return to_route('notes.show', ['note' => $note]);
    }

    public function destroy(Note $note)
    {
        $note->delete();
        $note->tags()->detach();

        return to_route('notes.index');
    }
}
