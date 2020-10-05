class RecipeFeed
  def recipes
    @recipes ||= Recipe.public_recipes.scored.limit(25)
  end
end