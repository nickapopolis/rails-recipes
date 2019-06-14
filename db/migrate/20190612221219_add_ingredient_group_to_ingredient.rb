class AddIngredientGroupToIngredient < ActiveRecord::Migration[5.2]
  def change
    add_column :ingredients, :ingredient_group_id, :bigint, index: true, foreign_key: true
  end
end
