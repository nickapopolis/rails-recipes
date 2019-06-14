module Types
  class QueryType < Types::BaseObject

    field :recipe, Recipe, null: true, description: "A recipe" do
      argument :id, ID, required: true
    end

    field :recipe_categories, [RecipeCategory], null: true, description: "Categories of recipes."

    def recipe_categories
      ::RecipeCategory.all
    end

    field :search, [Searchable], null: true, description: "Search for different record types" do
      argument :query_string, String, required: true
      argument :accept_types, [String], required: true
    end

    def recipe(id:)
      ::Recipe.find(id)
    end

    def search(query_string:, accept_types:)
      accept_types_classes = accept_types.map { |class_name| Object.const_get(class_name)}
      results = Elasticsearch::Model.search(query_string, accept_types_classes.map(&:model)).results.to_a.map(&:to_hash)
      results_by_type = results.group_by {|result| result['_type']}
      records_by_type = results_by_type.map do |class_name, results|
        klass = Object.const_get(class_name)
        record_ids = results.map { |record| record['_id'] }
        klass.where(id: record_ids)
      end
      records_by_id = records_by_type.flatten.reduce({}) do |records_by_id, record|
        records_by_id[record.id] = record
        records_by_id
      end
      results.map do |result|
        records_by_id[result['_id'].to_i]
      end
    end

    field :recipes, [Recipe], null: true, description: "A list of recipes"

    def recipes
      ::Recipe.all
    end
  end
end
