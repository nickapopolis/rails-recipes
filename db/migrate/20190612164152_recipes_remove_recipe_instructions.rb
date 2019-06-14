class RecipesRemoveRecipeInstructions < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :recipe_instructions
  end
end
