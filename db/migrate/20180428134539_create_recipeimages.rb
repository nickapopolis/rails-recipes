class CreateRecipeimages < ActiveRecord::Migration[5.1]
  def change
    create_table :recipeimages do |t|
      t.belongs_to :recipe, foreign_key: true
      t.integer :recipe_id

      t.timestamps
    end
  end
end
