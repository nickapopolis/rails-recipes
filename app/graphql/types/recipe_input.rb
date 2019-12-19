module Types
    class RecipeInput < BaseInputObject
        argument :title, String, required: true
        argument :calories, Int, required: false
        argument :cook_time, Int, required: false
        argument :description, String, required: false
        argument :id, Int, required: false
        argument :number_of_servings, Int, required: false
        argument :prep_time, Int, required: false
        argument :total_time, Int, required: false
        argument :instructions, [Types::RecipeInstructionInput], required: false
        argument :ingredient_groups, [Types::RecipeIngredientGroupInput], required: false 
        argument :labels, [Types::RecipeLabelInput], required: false
        argument :images, [Types::File], required: false
    end
end