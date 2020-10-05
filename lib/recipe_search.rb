class RecipeSearch
  attr_reader :query_string
  attr_reader :user

  def initialize(query_string: '', user: nil)
    @query_string = query_string
    @user = user
  end

  def user_scoped_recipes
    if user.present?
      ::Recipe.public_recipes.or(::Recipe.where(user: user))
    else
      ::Recipe.public_recipes
    end
  end

  def query_scoped_recipes
    Recipe.where('LOWER(title) LIKE ?', "%#{query_string.downcase}%")
      .or(Recipe.where('LOWER(description) LIKE ?', "%#{query_string.downcase}%"))
  end

  def perform
    user_scoped_recipes
      .merge(query_scoped_recipes)
      .limit(25)
      .to_a
  end

  def results
    @results ||= perform
  end
end