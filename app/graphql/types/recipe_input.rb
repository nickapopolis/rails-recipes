module Types
    class RecipeInput < BaseInputObject
        argument :title, String, required: true
        argument :calories, Int, required: true
        argument :cook_time, Int, required: false
        argument :description, String, required: false
        argument :id, Int, required: false
        argument :number_of_servings, Int, required: false
        argument :prep_time, Int, required: false
        argument :total_time, Int, required: false
        argument :instructions, [Types::RecipeInstructionInput], required: false
        argument :ingredients, [Types::RecipeIngredientInput], required: false
        argument :labels, [Types::RecipeLabelInput], required: false
        argument :images, [String], required: false
    end
end