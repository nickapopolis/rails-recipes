module Types
  class RecipeLabelInput < BaseInputObject
    argument :id, Int, required: false
    argument :name, String, required: true
  end
end