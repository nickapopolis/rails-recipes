class Recipe < ApplicationRecord
	belongs_to :user
	has_many :ingredients, dependent: :destroy
	has_many :recipeimages, dependent: :destroy 
	has_many :reviews, dependent: :destroy 
end
