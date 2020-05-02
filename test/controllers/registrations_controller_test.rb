require 'test_helper'

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should create a user" do
    assert_difference('User.count') do
      post url_for(:user_registration), params: {
        user: {
          first_name: 'John',
          last_name: 'Doe',
          email: "test_register@test.com",
          password: "123456"
        }
      }, as: :json
    end

    assert_response :success
  end
end
