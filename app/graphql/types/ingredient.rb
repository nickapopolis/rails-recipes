module Types
    class Ingredient < Types::BaseObject
        model ::Ingredient

        field :id, Int, null: false
        field :name, String, null: false
        field :ingredient_group, Types::IngredientGroup, null: true
    end
end