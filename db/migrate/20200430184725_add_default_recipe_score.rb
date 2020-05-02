class AddDefaultRecipeScore < ActiveRecord::Migration[5.2]
  def down
    change_column :recipes, :score, :bigint, default: 0, null: true
  end

  def up
    change_column :recipes, :score, :bigint, default: 0, null: false
  end
end
