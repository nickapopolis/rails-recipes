class ChangeIngredientsNumber < ActiveRecord::Migration[5.2]
  def change
    change_column :ingredients, :number, :string
  end
end
