require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should create user" do
    assert_difference('User.count') do
      post url_for(:user_registration), params: {
        user: {
          email: "test_register@test.com",
          password: "123456"
        }
      }, as: :json
    end

    assert_response :success
  end
end
