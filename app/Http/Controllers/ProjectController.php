<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();

        $inProgress = [];
        $finished = [];

        foreach ($projects as $project) {
            if ($project->currentAt < $project->finishAt) {
                $inProgress[] = $project;
                continue;
            }

            $finished[] = $project;
        }

        return Inertia::render('Hall/Index', ['inProgress' => $inProgress, 'finished' => $finished]);
    }

    public function create()
    {
        return Inertia::render('Hall/Create');
    }

    public function store()
    {
        request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'begin' => ['required', 'numeric', 'lte:finish'],
            'finish' => ['required', 'numeric'],
            'icon' => ['required', 'max:3']
        ]);

        Project::create([
            'title' => request('title'),
            'currentAt' => request('begin'),
            'finishAt' => request('finish'),
            'icon' => request('icon'),
        ]);

        return to_route('hall.index');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Hall/Edit', ['project' => $project]);
    }

    public function update(Project $project)
    {
        request()->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'begin' => ['required', 'numeric', 'lte:finish'],
            'finish' => ['required', 'numeric'],
            'icon' => ['required', 'max:3']
        ]);

        $project->update([
            'title' => request('title'),
            'currentAt' => request('begin'),
            'finishAt' => request('finish'),
            'icon' => request('icon'),
        ]);

        return to_route('hall.index');
    }
}
