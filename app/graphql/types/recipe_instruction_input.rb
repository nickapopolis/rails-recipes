module Types
  class RecipeInstructionInput < BaseInputObject
    argument :id, Int, required: false
    argument :body, String, required: false
    argument :step, Int, required: true
  end
end