class ChangeIngredientsNumberToDecimal < ActiveRecord::Migration[5.2]
  def change
    change_column :ingredients, :number, :decimal
  end
end
