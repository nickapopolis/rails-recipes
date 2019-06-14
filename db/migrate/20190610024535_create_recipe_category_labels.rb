class CreateRecipeCategoryLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_category_labels do |t|
      t.belongs_to :label, index: true, foreign_key: true
      t.belongs_to :recipe_category, index: true, foreign_key: true
      t.timestamps
    end
  end
end
