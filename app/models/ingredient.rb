class Ingredient < ApplicationRecord

  validates :name, presence: true
  belongs_to :ingredient_group
  delegate :recipe, :to => :ingredient_group
end
