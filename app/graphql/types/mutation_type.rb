module Types
  class MutationType < Types::BaseObject
    field :recipe_create, Types::Recipe, null: true do |field|
      field.argument(:recipe, Types::RecipeInput, required: true)
    end
  end
end
