module Types
    class IngredientGroup < Types::BaseObject
        model ::IngredientGroup

        field :id, Int, null: false
        field :name, String, null: true
        field :ingredients, [Types::Ingredient], null: true
    end
end