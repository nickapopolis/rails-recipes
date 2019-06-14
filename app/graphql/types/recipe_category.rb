module Types
    class RecipeCategory < Types::BaseObject
        model ::RecipeCategory

        field :id, Int, null: false
        field :name, String, null: false
        field :labels, [Types::Label], null: true
    end
end