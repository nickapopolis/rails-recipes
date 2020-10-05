module Types
    class Searchable < Types::BaseUnion
        description "Objects which may be searched on"
        possible_types Types::Recipe

        def self.resolve_type(object, context)
            possible_types.detect { |type| type.model == object.class }
        end
    end
end