class AddRecipeToIngredientGroup < ActiveRecord::Migration[5.2]
  def change
    add_column :ingredient_groups, :recipe_id, :bigint, index: true, foreign_key: true
  end
end
