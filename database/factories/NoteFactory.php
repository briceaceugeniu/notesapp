<?php

namespace Database\Factories;

use App\Models\Note;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->faker->dateTimeBetween('-1 year', 'now');

        return [
            'title' => fake()->text(30),
            'content' => fake()->text(2500),
            'created_at' => $createdAt,
            'updated_at' => Carbon::instance($createdAt)->addDays(random_int(0, 30))
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): Factory
    {
        return $this->afterCreating(function (Note $note) {
            // Assuming you have some tag IDs you want to attach to every post
            $tagIds = Tag::inRandomOrder()->take(1)->pluck('id')->first();

            $note->tags()->attach($tagIds);
        });
    }
}
