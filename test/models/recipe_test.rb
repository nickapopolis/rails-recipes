require 'test_helper'

require "minitest/mock"
class RecipeTest < ActiveSupport::TestCase

  setup do
    @recipe = recipes(:one)
    @user = users(:one)
  end

  test "score is zero when there are no votes" do
    assert_equal score(0, 0), 0
  end

  test "score is positive when there are only upvotes" do
    assert score(100, 0) > 0
  end

  test "score is negative when there are only downvotes" do
    assert score(0, 100) < 0
  end

  test "age causes decay" do
    assert score(100, 0, Time.zone.now) > score(100, 0, Time.zone.now + 1.day)
  end

  test "higher scores are better" do
    assert score(5, 1) > score(4, 1)
  end

  test "higher scores are better than negative scores" do
    assert score(2, 0) > score(0, 2)
  end

  private

  def score(upvotes, downvotes, date=Time.zone.now)
    @recipe.stub :upvotes, upvotes do
      @recipe.stub :downvotes, downvotes do
        travel_to date do
          @recipe.score
        end
      end
    end
  end
end
