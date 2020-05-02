require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @valid_user_params = {
      first_name: 'john',
      last_name: 'doe',
      email: "usermodel@test.com",
      password: "123456"
    }
  end

  test "should create user" do
    user = User.create(@valid_user_params)
    assert !user.new_record?
  end

  test "should fail to create user without email" do
    user = User.create(@valid_user_params.merge(email: ''))
    assert user.new_record?
  end

  test "should fail to create user without password" do
    user = User.create(@valid_user_params.merge(password: ''))
    assert user.new_record?
  end

  test "should fail to create multiple users with the same email" do
    user1 = User.create(@valid_user_params)
    assert !user1.new_record?
    user2 = User.create(@valid_user_params)
    assert_equal user2.errors[:email].first, "has already been taken"
  end

  test "should update user" do
    user1 = User.create(@valid_user_params)
    assert !user1.new_record?
    user1.email = 'usermodel2@test.com'
    assert user1.save
  end

  test "should read user" do
    user = User.create(@valid_user_params)
    assert !user.new_record?
    loadedUser = User.find(user.id)
    assert !loadedUser.new_record?
  end

  test "should remove user" do
    user = User.create(@valid_user_params)
    assert !user.new_record?
    assert user.destroy
  end
end
