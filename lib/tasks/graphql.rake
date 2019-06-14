namespace :graphql do
  namespace :schema do
    task dump: [:environment] do
      directory = Rails.root.join('db/graphql')

      schemas = {
        recipes_schema: RecipesSchema,
      }

      schemas.each do |name, schema|
        schema_definition = schema.to_definition()
        filename = "#{name}.graphql"
        filepath = directory.join(filename)
        File.write(filepath, schema_definition)
      end
    end
  end
end
