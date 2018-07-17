require 'test_helper'

class IngredientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ingredient = ingredients(:one)
  end

  test "should get index" do
    get ingredients_url, as: :json
    assert_response :success
  end

  test "should get new" do
    get new_ingredient_url, as: :json
    assert_response :success
  end

  test "should create ingredient" do
    assert_difference('Ingredient.count') do
      post ingredients_url, params: {
        ingredient: {
          name: @ingredient.name,
          number: @ingredient.number,
          recipe_id: @ingredient.recipe_id,
          unitOfMeasurement: @ingredient.unitOfMeasurement
        }
      }, as: :json
    end

    assert_response :success
  end

  test "should show ingredient" do
    get ingredient_url(@ingredient), as: :json
    assert_response :success
  end

  test "should update ingredient" do
    patch ingredient_url(@ingredient), params: {
      ingredient: {
        name: @ingredient.name,
        number: @ingredient.number,
        recipe_id: @ingredient.recipe_id,
        unitOfMeasurement: @ingredient.unitOfMeasurement
      }
    }, as: :json
    assert_response :success
  end

  test "should destroy ingredient" do
    assert_difference('Ingredient.count', -1) do
      delete ingredient_url(@ingredient), as: :json
    end

    assert_response :success
  end
end
