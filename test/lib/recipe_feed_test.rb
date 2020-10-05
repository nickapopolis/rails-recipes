require 'test_helper'
require 'recipe_feed'

class RecipeFeedTest < ActiveSupport::TestCase
  test "returns public recipes with highest score first" do
    public_recipe = recipes(:public)
    recipes = RecipeFeed.new.recipes
    assert_equal recipes.first, public_recipe
  end

  test "returns public recipes with lowest score last" do
    public_low_score_recipe = recipes(:public_low_score)
    recipes = RecipeFeed.new.recipes
    assert_equal recipes.last, public_low_score_recipe
  end
end
