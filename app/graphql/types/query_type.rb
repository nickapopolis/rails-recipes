require 'recipe_feed'
require 'recipe_search'

module Types
  class QueryType < Types::BaseObject

    field :current_user, User, null: true, description: "The logged in user."
    
    def current_user
      context[:current_user]
    end

    field :recipe_categories, [RecipeCategory], null: true, description: "Categories of recipes."

    def recipe_categories
      ::RecipeCategory.all
    end

    field :recipe, Recipe, null: true, description: "A recipe." do
      argument :id, ID, required: true
    end

    def recipe(id:)
      ::Recipe.find(id)
    end

    field :recipes, [Recipe], null: true, description: "A list of recipes"

    def recipes
      ::Recipe.where(user: current_user).alphabetic
    end

    field :recipe_feed, [Recipe], null: true, description: "A list of the most popular recipes"

    def recipe_feed
      RecipeFeed.new.recipes
    end

    field :recipe_search, [Recipe], null: true, description: "Search for recipes using a query string" do
      argument :query_string, String, required: true
    end

    def recipe_search(query_string:)
      RecipeSearch.new(query_string: query_string, user: current_user).results
    end
  end
end
