class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|

      t.belongs_to :user, index: true, foreign_key: true
      t.integer :cook_time
      t.date :date_published
      t.string :description
      t.integer :calories
      t.integer :prep_time
      t.string :recipe_category
      t.string :recipe_instructions
      t.integer :number_of_servings
      t.integer :total_time
      t.string :title

      t.timestamps
    end
  end
end
