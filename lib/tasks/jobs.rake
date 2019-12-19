namespace :jobs do
  task recipe_score: [:environment] do
    RecipeScoreJob.perform_now
  end
end
