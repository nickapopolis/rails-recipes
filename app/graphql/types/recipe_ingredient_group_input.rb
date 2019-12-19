module Types
    class RecipeIngredientGroupInput < BaseInputObject
      argument :id, Int, required: false
      argument :name, String, required: false
      argument :ingredients, [Types::RecipeIngredientInput], required: false
    end
  end