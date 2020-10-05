require 'test_helper'
require 'recipe_search'

class RecipeSearchTest < ActiveSupport::TestCase
  setup do
    @recipe = recipes(:search)
    @user = @recipe.user
  end

  test "returns results when search has an exact title match" do
    result = RecipeSearch.new(query_string: 'Jerk chicken', user: @user).results
    assert_equal [@recipe], result
  end

  test "returns results when search has a partial title match" do
    result = RecipeSearch.new(query_string: 'Jerk', user: @user).results
    assert_equal [@recipe], result
  end

  test "returns results when search has a partial title case insensitive match" do
    result = RecipeSearch.new(query_string: 'jerk chicken', user: @user).results
    assert_equal [@recipe], result
  end

  test "returns results when search has an exact description match" do
    result = RecipeSearch.new(query_string: 'This is the greatest jerk recipe that I have ever seen', user: @user).results
    assert_equal [@recipe], result
  end

  test "returns results when search has a partial description match" do
    result = RecipeSearch.new(query_string: 'This is the greatest jerk recipe', user: @user).results
    assert_equal [@recipe], result
  end

  test "returns results when search has a partial description case insensitive match" do
    result = RecipeSearch.new(query_string: 'this is the greatest jerk recipe that I have ever seen', user: @user).results
    assert_equal [@recipe], result
  end

  test "returns nothing when search has no match" do
    result = RecipeSearch.new(query_string: 'Jerks chicken', user: @user).results
    assert_equal [], result
  end

  test "returns no results when search has a match but is on a private recipe" do
    result = RecipeSearch.new(query_string: 'This is the greatest jerk recipe that I have ever seen', user: nil).results
    assert_equal [], result
  end

  test "returns results when search has a match on a public recipe" do
    public_recipe = recipes(:public)
    result = RecipeSearch.new(query_string: 'This is the most public recipe that I have ever seen', user: nil).results
    assert_equal [public_recipe], result
  end
end
