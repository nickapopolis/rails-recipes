class RecipeVote < ApplicationRecord
  belongs_to :user
  belongs_to :recipe


  scope :upvotes, -> { where(upvote: true) }
  scope :downvotes, -> { where(upvote: false) }

  validates :upvote, presence: true
  validates :user, presence: true
  validates :recipe, presence: true
end
