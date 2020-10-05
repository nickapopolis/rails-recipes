module Types
    class Ingredient < Types::BaseObject
        model ::Ingredient

        field :id, ID, null: false
        field :name, String, null: false
        field :ingredient_group, Types::IngredientGroup, null: true
    end
end