module Types
  class RecipeIngredientInput < BaseInputObject
    argument :id, Int, required: false
    argument :number, Float, required: false
    argument :name, String, required: true
    argument :unit_of_measurement, String, required: false
  end
end