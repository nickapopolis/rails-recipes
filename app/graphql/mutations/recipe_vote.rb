module Mutations
  class RecipeVote < Mutations::BaseMutation
    null true

    argument :recipe_id, ID, required: true, loads: Types::Recipe
    argument :upvote, Boolean, required: true

    field :errors, [String], null: false
  
    def ready?(**args)
      if !context[:current_user]
        raise GraphQL::ExecutionError, "User account required to create vote on recipes."
      else
        true
      end
    end

    def resolve(recipe:, upvote:)
      created_vote = recipe.votes.find_or_create_by(user: context[:current_user]) do |vote|
        vote.upvote = upvote
      end

      {
        errors: created_vote.errors.full_messages,
      }
    end
  end
end