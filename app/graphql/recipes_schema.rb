class RecipesSchema < GraphQL::Schema

  mutation(Types::MutationType)
  query(Types::QueryType)

  def self.id_from_object(object, type_definition, query_ctx)
    object.to_global_id
  end

  def self.object_from_id(id, query_ctx)
    GlobalID::Locator.locate(id)
  end

  def self.resolve_type(type, object, context)
    case object
    when ::Recipe
      Types::Recipe
    else
      raise("Unexpected object: #{obj}")
    end
  end
end
