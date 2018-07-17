require 'test_helper'

class RecipeimagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipeimage = recipeimages(:one)
  end

  test "should get index" do
    get recipeimages_url, as: :json
    assert_response :success
  end

  test "should get new" do
    get new_recipeimage_url, as: :json
    assert_response :success
  end

  test "should create recipeimage" do
    assert_difference('Recipeimage.count') do
      post recipeimages_url, params: {
        recipeimage: {
          recipe_id: @recipeimage.recipe_id
        }
      }, as: :json
    end
    assert_response :success
  end

  test "should show recipeimage" do
    get recipeimage_url(@recipeimage), as: :json
    assert_response :success
  end

  test "should update recipeimage" do
    patch recipeimage_url(@recipeimage), params: {
      recipeimage: {
        recipe_id: @recipeimage.recipe_id
      }
    }, as: :json
    assert_response :success
  end

  test "should destroy recipeimage" do
    assert_difference('Recipeimage.count', -1) do
      delete recipeimage_url(@recipeimage), as: :json
    end
    assert_response :success
  end
end
