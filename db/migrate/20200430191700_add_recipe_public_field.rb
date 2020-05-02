class AddRecipePublicField < ActiveRecord::Migration[5.2]
  def up
    add_column :recipes, :public, :boolean, null: false, default: false
  end

  def down
    remove_column :recipes, :public, :boolean
  end
end
