class RecipeLabel < ApplicationRecord
    belongs_to :label
    belongs_to :recipe
end
