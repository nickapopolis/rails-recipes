module Types
    class Recipe < Types::BaseObject
        model ::Recipe

        field :calories, Int, null: true
        field :cook_time, Int, null: true
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
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

        def user
            ::User.find(object.user_id)
        end

        def instructions
            object.instructions.order(:step)
        end

    end
end