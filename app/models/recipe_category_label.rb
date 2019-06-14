class RecipeCategoryLabel < ApplicationRecord
    belongs_to :label
    belongs_to :recipe_category
end
