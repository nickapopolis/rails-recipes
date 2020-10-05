module Types
    class Label < Types::BaseObject
        model ::Label

        field :id, ID, null: false
        field :name, String, null: false
    end
end