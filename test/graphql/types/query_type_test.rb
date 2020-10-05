require 'test_helper'

module Graphql
  module Types
    class QueryTypeTest < ActiveSupport::TestCase
      test "loads public recipe with recipe fields" do
        query_string = <<-GRAPHQL
          query($id: ID!){
            recipe(id: $id) {
              title
              description
              calories
              cookTime
              datePublished
              description
              id
              numberOfServings
              prepTime
              recipeCategory
              totalTime
              updatedAt
              title
              images
              score
              upvotes
              downvotes
              upvoted
              downvoted
            }
          }
        GRAPHQL
      
        @recipe = recipes(:public)
        result = RecipesSchema.execute(query_string, variables: { id: @recipe.id })
        recipe = result["data"]["recipe"]
        assert_equal 'Public recipe', recipe['title']
        assert_equal 'This is the most public recipe that I have ever seen', recipe['description']
        assert_equal 1000, recipe['calories']
        assert_equal 50, recipe['cookTime']
        assert_equal @recipe.date_published.iso8601, recipe['datePublished']
        assert_equal @recipe.id.to_s, recipe['id']
        assert_equal 1, recipe['numberOfServings']
        assert_equal 50, recipe['prepTime']
        assert_equal 100, recipe['totalTime']
        assert_equal @recipe.updated_at.iso8601, recipe['updatedAt']
        assert_equal 10000, recipe['score']
      end


      test "loads public recipe with user fields" do
        query_string = <<-GRAPHQL
          query($id: ID!){
            recipe(id: $id) {
              user{
                firstName
                lastName
              }
            }
          }
        GRAPHQL
      
        @recipe = recipes(:public)
        result = RecipesSchema.execute(query_string, variables: { id: @recipe.id })
        user = result["data"]["recipe"]["user"]
        assert_equal 'TestOne', user['firstName']
        assert_equal 'Test', user['lastName']
      end

      test "loads email field if current user is requesting own email" do
        skip
        query_string = <<-GRAPHQL
          query($id: ID!){
            recipe(id: $id) {
              user{
                email
              }
            }
          }
        GRAPHQL
      
        @recipe = recipes(:public)
        result = RecipesSchema.execute(query_string, variables: { id: @recipe.id })
        user = result["data"]["recipe"]["user"]
        assert_equal 'test@test.com', user['email']
      end


      test "does not load email field if current user requesting other users email" do
        query_string = <<-GRAPHQL
          query($id: ID!){
            recipe(id: $id) {
              user{
                email
              }
            }
          }
        GRAPHQL
      
        @recipe = recipes(:public)
        result = RecipesSchema.execute(query_string, variables: { id: @recipe.id })
        user = result["data"]["recipe"]["user"]
        assert_nil user['email']
      end

      test "loads public recipe with instruction fields" do
        query_string = <<-GRAPHQL
          query($id: ID!){
            recipe(id: $id) {
              instructions{
                body
                step
                id
              }
            }
          }
        GRAPHQL
      
        @recipe = recipes(:public)
        @instruction = recipe_instructions(:public_one)
        result = RecipesSchema.execute(query_string, variables: { id: @recipe.id })
        instruction = result["data"]["recipe"]["instructions"].first
        assert_equal 0, instruction['step']
        assert_equal 'Preheat the oven to 375°F', instruction['body']
        assert_equal @instruction.id.to_s, instruction['id']
      end

      test "loads public recipe with ingredient fields" do
        query_string = <<-GRAPHQL
          query($id: ID!){
            recipe(id: $id) {
              ingredients{
                id
                name
                ingredientGroup{
                  id
                  name
                }
              }
            }
          }
        GRAPHQL
      
        @recipe = recipes(:public)
        @ingredient = ingredients(:public_default_salt)
        @ingredient_group = ingredient_groups(:public_default)
        result = RecipesSchema.execute(query_string, variables: { id: @recipe.id })
        ingredient = result["data"]["recipe"]["ingredients"].first
        assert_equal '1 Tbsp salt', ingredient['name']
        assert_equal @ingredient.id.to_s, ingredient['id']

        ingredient_group = ingredient['ingredientGroup']
        assert_nil ingredient_group['name']
        assert_equal @ingredient_group.id.to_s, ingredient_group['id']
      end

      test "loads public recipe with ingredientGroup fields" do
        query_string = <<-GRAPHQL
          query($id: ID!){
            recipe(id: $id) {
              ingredientGroups{
                id
                name
                ingredients{
                  id
                  name
                }
              }
            }
          }
        GRAPHQL
      
        @recipe = recipes(:public)
        @ingredient = ingredients(:public_default_salt)
        @ingredient_group = ingredient_groups(:public_default)
        result = RecipesSchema.execute(query_string, variables: { id: @recipe.id })
        ingredient_group = result["data"]["recipe"]["ingredientGroups"].first
        assert_nil ingredient_group['name']
        assert_equal @ingredient_group.id.to_s, ingredient_group['id']

        ingredient = ingredient_group["ingredients"].first
        assert_equal '1 Tbsp salt', ingredient['name']
        assert_equal @ingredient.id.to_s, ingredient['id']
      end
    end
  end
end