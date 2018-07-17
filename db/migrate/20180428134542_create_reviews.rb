class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.belongs_to :recipe, foreign_key: true

      t.timestamps
    end
  end
end
