require 'test_helper'

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should create a user" do
    assert_difference('User.count', +1) do
      post '/users', params: {
        user: {
          first_name: 'John',
          last_name: 'Doe',
          email: "test_register@test.com",
          password: "Test_123456!"
        }
      }, as: :json
    end

    assert_response :success
  end
end
