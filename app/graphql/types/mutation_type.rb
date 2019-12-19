module Types
  class MutationType < Types::BaseObject
    field :recipe_create, mutation: Mutations::RecipeCreate
    field :recipe_vote, mutation: Mutations::RecipeVote
  end
end
