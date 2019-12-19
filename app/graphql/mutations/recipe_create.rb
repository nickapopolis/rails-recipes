module Mutations
    class RecipeCreate < Mutations::BaseMutation
      null true

      argument :recipe, Types::RecipeInput, required: true
    
      field :recipe, Types::Recipe, null: true
      field :errors, [String], null: false
    
      def ready?(**args)
        if !context[:current_user]
          raise GraphQL::ExecutionError, "User account required to create recipes."
        else
          true
        end
      end

      def resolve(recipe:)
        created_recipe = ::Recipe.transaction do
          instructions = recipe.instructions.map do |instruction|
            RecipeInstruction.new(body: instruction.body, step: instruction.step)
          end

          ingredient_groups = recipe.ingredient_groups.map do |ingredient_group|
            IngredientGroup.new(
              name: ingredient_group.name,
              ingredients: ingredient_group.ingredients.map do |ingredient|
                Ingredient.new(
                  number: ingredient.number,
                  name: ingredient.name,
                  unit_of_measurement: ingredient.unit_of_measurement,
                )
              end
            )
          end

          Recipe.create!(
            # user_id: recipe['user_id'],
            user: context[:current_user],
            calories: recipe.calories,
            cook_time: recipe.cook_time,
            description: recipe.description,
            number_of_servings: recipe.number_of_servings,
            prep_time: recipe.prep_time,
            # # recipe_category: recipe['recipe_category'],
            # total_time: recipe.total_time,
            title: recipe.title,
            ingredient_groups: ingredient_groups,
            instructions: instructions,
            # labels: labels,
          )
        end

        {
          recipe: created_recipe,
          errors: created_recipe.errors.full_messages,
        }
      end
    end
end