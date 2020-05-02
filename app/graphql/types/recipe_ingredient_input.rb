module Types
  class RecipeIngredientInput < BaseInputObject
    argument :id, Int, required: false
    argument :name, String, required: true
  end
end