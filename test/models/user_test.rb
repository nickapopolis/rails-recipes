require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should create user" do
    user = User.create(email: "usermodel@test.com", password: "123456")
    assert !user.new_record?
  end
  test "should fail to create user without email" do
    user = User.create(email: " ", password: "123456")
    assert user.new_record?
  end
  test "should fail to create user without password" do
    user = User.create(email: "usermodel@test.com", password: "")
    assert user.new_record?
  end
  test "should fail to create multiple users with the same email" do
    user1 = User.create(email: "usermodel@test.com", password: "123456")
    assert !user1.new_record?
    user2 = User.create(email: "usermodel@test.com", password: "123456")
    assert_equal user2.errors[:email].first, "has already been taken"
  end
  test "should update user" do
    user1 = User.create(email: "usermodel@test.com", password: "123456")
    assert !user1.new_record?
    user1.email = 'usermodel2@test.com'
    assert user1.save
  end
  test "should read user" do
    user = User.create(email: "usermodel@test.com", password: "123456")
    assert !user.new_record?
    loadedUser = User.find(user.id)
    assert !loadedUser.new_record?
  end
  test "should remove user" do
    user = User.create(email: "usermodel@test.com", password: "123456")
    assert !user.new_record?
    assert user.destroy
  end
end
