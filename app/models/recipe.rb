require 'elasticsearch/model'

class Recipe < ApplicationRecord
	include Elasticsearch::Model
	include Elasticsearch::Model::Callbacks

    document_type "Recipe"

	settings index: { number_of_shards: 1 } do
		mappings dynamic: 'false' do
			indexes :title, analyzer: 'english'
			indexes :user_id, type: 'integer'
			indexes :cook_time, type: 'integer'
			indexes :date_published, type: 'date'
			indexes :description, analyzer: 'english'
			indexes :calories, type: 'integer'
			indexes :prep_time, type: 'integer'
			indexes :recipe_category, analyzer: 'english'
			indexes :number_of_servings, type: 'integer'
			indexes :total_time, type: 'integer'
			indexes :title, analyzer: 'english'
			indexes :created_at, type: 'date'
			indexes :updated_at, type: 'date'
		end
	end
	

	belongs_to :user
	has_many :ingredients, dependent: :destroy
	has_many :recipeimages, dependent: :destroy 
	has_many :reviews, dependent: :destroy
	has_many :recipe_labels, dependent: :destroy
	has_many :labels, through: :recipe_labels
	has_many :instructions, dependent: :destroy, class_name: 'RecipeInstruction'
end
