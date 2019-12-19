class RecipeScoreJob < ApplicationJob
  def perform
    Recipe.find_in_batches do |recipes|
      recipes.each do |recipe|
        recipe.update(score: recipe.calculate_score)
      end
    end
  end
end
