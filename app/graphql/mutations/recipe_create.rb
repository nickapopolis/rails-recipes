module Mutations
    class RecipeCreate < Mutations::BaseMutation
      null true

      argument :recipe, Types::RecipeInput, required: true
    
      field :recipe, Types::Recipe, null: true
      field :errors, [String], null: false
    
      def resolve(recipe:)
        created_recipe = ::Recipe.create(*recipe)
        {
          recipe: created_recipe,
          errors: created_recipe.errors.full_messages,
        }
      end
    end
end