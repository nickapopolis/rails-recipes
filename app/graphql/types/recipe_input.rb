module Types
    class RecipeInput < BaseInputObject
        argument :title, String, required: true
        argument :calories, Int, required: true
        argument :cook_time, Int, required: false
        argument :description, String, required: false
        argument :id, Int, required: false
        argument :number_of_servings, Int, required: false
        argument :prep_time, Int, required: false
        argument :recipe_category, String, required: false
        argument :recipe_instructions, String, required: false
        argument :total_time, Int, required: false
        argument :title, String, required: true
    end
end