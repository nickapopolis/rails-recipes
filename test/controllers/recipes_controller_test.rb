require 'test_helper'

class RecipesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe = recipes(:one)
  end

  test "should get index" do
    get recipes_url, as: :json
    assert_response :success
  end

  test "should get new" do
    get new_recipe_url, as: :json
    assert_response :success
  end

  test "should create recipe" do
    assert_difference('Recipe.count') do
      post recipes_url, params: {
        recipe: {
          user_id: @recipe.user.id,
          calories: @recipe.calories,
          cookTime: @recipe.cookTime,
          datePublished: @recipe.datePublished,
          description: @recipe.description,
          numberOfServings: @recipe.numberOfServings,
          prepTime: @recipe.prepTime,
          recipeCategory: @recipe.recipeCategory,
          recipeInstructions: @recipe.recipeInstructions,
          totalTime: @recipe.totalTime
        }
      }, as: :json
    end

    assert_response :success
  end
  test "should show recipe" do
    get recipe_url(@recipe), as: :json
    assert_response :success
  end

  test "should update recipe" do
    patch recipe_url(@recipe), params: {
      recipe: {
        user_id: @recipe.user.id,
        calories: @recipe.calories,
        cookTime: @recipe.cookTime,
        datePublished: @recipe.datePublished,
        description: @recipe.description,
        numberOfServings: @recipe.numberOfServings,
        prepTime: @recipe.prepTime,
        recipeCategory: @recipe.recipeCategory,
        recipeInstructions: @recipe.recipeInstructions,
        totalTime: @recipe.totalTime
      }
    }, as: :json
    assert_response :success
  end

  test "should destroy recipe" do
    assert_difference('Recipe.count', -1) do
      delete recipe_url(@recipe), as: :json
    end

    assert_response :success
  end
end
