module Types
    class User < Types::BaseObject
        
        field :first_name, String, null: false
        field :last_name, String, null: false
        field :email, String, null: true
        field :id, String, null: true

        def email
            return object.email if current_user == object
        end

        def current_user
            context[:current_user]
        end
    end
end