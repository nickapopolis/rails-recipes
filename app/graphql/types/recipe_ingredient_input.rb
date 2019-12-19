module Types
  class RecipeIngredientInput < BaseInputObject
    argument :id, Int, required: false
    argument :number, String, required: false
    argument :name, String, required: true
    argument :unit_of_measurement, String, required: false
  end
end