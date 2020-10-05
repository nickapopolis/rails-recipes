require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should log a user in" do
    post '/users/sign_in', params: {
      user: {
        email: 'test@test.com',
        password: '123456',
      }
    }, as: :json

    assert_response :success
  end

  test "should log a user out" do
    delete '/users/sign_out', as: :json

    assert_response :success
  end
end
