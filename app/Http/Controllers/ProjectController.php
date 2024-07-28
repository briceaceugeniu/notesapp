<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();

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
}
