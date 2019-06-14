module Types
    class Searchable < Types::BaseUnion
        description "Objects which may be searched on"
        possible_types Types::Recipe

        def self.resolve_type(object, context)
            puts 'possible_types', possible_types, object.class
            possible_types.detect { |type| type.model == object.class }
        end
    end
end