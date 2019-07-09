class IngredientGroup < ApplicationRecord
    has_many :ingredients
    belongs_to :recipe
end
