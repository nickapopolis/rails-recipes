class Recipe < ApplicationRecord

	LN10 = 2.30258

	validates :cook_time, presence: true
	validates :prep_time, presence: true
	validates :total_time, presence: true
	validates :description, presence: true
	validates :number_of_servings, presence: true
	validates :title, presence: true

  scope :scored, -> { order 'score DESC' }
  scope :alphabetic, -> { order 'title ASC' }
  scope :public_recipes, -> { where(public: true) }

	belongs_to :user
	has_many :recipeimages, dependent: :destroy 
	has_many :reviews, dependent: :destroy
	has_many :recipe_labels, dependent: :destroy
	has_many :votes, dependent: :destroy, class_name: 'RecipeVote'
	has_many :labels, through: :recipe_labels
	has_many :instructions, dependent: :destroy, class_name: 'RecipeInstruction'
  has_many :ingredient_groups, dependent: :destroy
	has_many :ingredients, dependent: :destroy, through: :ingredient_groups
  has_many_attached :images
  
	def date_published
		created_at
	end

  def total_time
    cook_time + prep_time
	end

	def calculate_score
		decay = 45000;
		s = upvotes - downvotes
		sign = num_sign(s)
		order = Math.log([s.abs, 1].max) / LN10
		sec_age = (Time.zone.now - created_at).seconds.to_i;
		stats = {
			s: s,
			sign: sign,
			order: order,
			sec_age: sec_age,
			decay: decay,
		}
    sign * order - sec_age / decay;
	end

	def upvotes
		votes.upvotes.count
	end

	def downvotes
		votes.downvotes.count
	end

	private

	def num_sign(num)
		raise ArgumentError, 'Argument is not numeric' unless num.is_a? Numeric  
		if num > 0
			1
		elsif num < 0
			-1
		elsif num == 0
			0
		end
	end
end
