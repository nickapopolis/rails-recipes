class AddScoreToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :score, :bigint, index: true
  end
end
