class CreateIngredients < ActiveRecord::Migration[5.1]
  def change
    create_table :ingredients do |t|
      t.belongs_to :recipe, foreign_key: true
      t.string :name
      t.integer :number
      t.string :unitOfMeasurement

      t.timestamps
    end
  end
end
