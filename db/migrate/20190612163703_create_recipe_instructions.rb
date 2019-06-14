class CreateRecipeInstructions < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_instructions do |t|
      t.belongs_to :recipe, index: true, foreign_key: true
      t.bigint :step
      t.string :body
      t.timestamps
    end
  end
end
