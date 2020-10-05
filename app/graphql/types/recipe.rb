module Types
    class Recipe < Types::BaseObject
        model ::Recipe

        def self.authorized?(recipe, context)
            super &&
                !recipe.user ||
                recipe.public ||
                (context[:current_user] && recipe.user == context[:current_user])
        end

        field :calories, Int, null: true
        field :cook_time, Int, null: true
        field :date_published, GraphQL::Types::ISO8601DateTime, null: false
        field :date_published, GraphQL::Types::ISO8601DateTime, null: false
        field :description, String, null: true
        field :id, ID, null: false
        field :number_of_servings, Int, null: true
        field :prep_time, Int, null: true
        field :recipe_category, String, null: true
        field :instructions, [Types::RecipeInstruction], null: true
        field :total_time, Int, null: true
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
        field :user, Types::User, null: false
        field :title, String, null: false
        field :labels, [Types::Label], null: true
        field :ingredients, [Types::Ingredient], null: true
        field :ingredient_groups, [Types::IngredientGroup], null: true
        field :images, [String], null: true
        field :score, Int, null: false
        field :upvotes, Int, null: false
        field :downvotes, Int, null: false
        field :upvoted, Boolean, null: false
        field :downvoted, Boolean, null: false

        def images
            object.images.map do |image|
                Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
            end
        end

        def instructions
            object.instructions.order(:step)
        end

        def upvoted
            return false if !context[:current_user]
            votes = object.votes.where(user: context[:current_user]).first
            !!(votes && votes.upvote)
        end

        def downvoted
            return false if !context[:current_user]
            votes = object.votes.where(user: context[:current_user]).first
            !!(votes && !votes.upvote)
        end
    end
end