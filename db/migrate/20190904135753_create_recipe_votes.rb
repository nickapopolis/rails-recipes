class CreateRecipeVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_votes do |t|
      t.belongs_to :recipe, index: true, foreign_key: true
      t.belongs_to :user, index: true, foreign_key: true
      t.boolean :upvote, null: false
      t.timestamps

      t.index [:recipe_id, :user_id], unique: true
    end
  end
end
