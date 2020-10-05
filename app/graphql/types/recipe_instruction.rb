module Types
    class RecipeInstruction < Types::BaseObject
        field :body, String, null: false
        field :step, Integer, null: false
        field :id, ID, null: false
    end
end