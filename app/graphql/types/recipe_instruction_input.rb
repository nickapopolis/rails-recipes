module Types
  class RecipeInstructionInput < BaseInputObject
    argument :id, Int, required: false
    argument :body, String, required: false
  end
end