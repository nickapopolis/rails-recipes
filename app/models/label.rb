class Label < ApplicationRecord
    has_many :recipe_category_labels
    has_many :recipe_labels
    has_many :recipes, through: :recipe_labels
    has_many :recipe_categories, through: :recipe_category_labels
end
