module Types
  class MutationType < Types::BaseObject
    field :recipe_create, mutation: Mutations::RecipeCreate
  end
end
