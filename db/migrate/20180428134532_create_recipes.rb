class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|

      t.belongs_to :user, index: true, foreign_key: true
      t.integer :cookTime
      t.date :datePublished
      t.string :description
      t.integer :calories
      t.integer :prepTime
      t.string :recipeCategory
      t.string :recipeInstructions
      t.integer :numberOfServings
      t.integer :totalTime

      t.timestamps
    end
  end
end
