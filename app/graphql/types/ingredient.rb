module Types
    class Ingredient < Types::BaseObject
        model ::Ingredient

        field :id, Int, null: false
        field :number, String, null: true
        field :name, String, null: false
        field :unit_of_measurement, String, null: true
        field :ingredient_group, Types::IngredientGroup, null: true
    end
end