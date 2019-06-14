module Types
    class Label < Types::BaseObject
        model ::Label

        field :id, Int, null: false
        field :name, String, null: false
    end
end