class RecipeCategory < ApplicationRecord
    has_many :recipe_category_labels, dependent: :destroy
    has_many :labels, through: :recipe_category_labels
end
