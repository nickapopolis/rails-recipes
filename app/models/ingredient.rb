class Ingredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient_group, optional: true
end
