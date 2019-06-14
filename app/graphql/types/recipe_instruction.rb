module Types
    class RecipeInstruction < Types::BaseObject
        field :body, String, null: false
        field :step, Integer, null: false
    end
end