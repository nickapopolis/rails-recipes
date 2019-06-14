module Types
    class User < Types::BaseObject
        field :first_name, String, null: false
        field :last_name, String, null: false
        field :name, String, null: false

        def name
            I18n.t('user.full_name', first_name: object.first_name, last_name: object.last_name)
        end
    end
end