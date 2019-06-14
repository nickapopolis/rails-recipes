# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if ENV.fetch('RAILS_ENV') == 'development'

	users = [
		{id: 1, first_name: 'Nick', last_name: 'Tierney', email: 'test@test.com', password: '123456'}
	]
	Rails.logger.info("Creating #{users.length} users")
	created_users = users.map {|user| User.create(**user)}

	mealtype_labels = [
		{ id: 1, name: 'Appetizers & Snacks' },
		{ id: 2, name: 'Breakfast & Brunch' },
		{ id: 3, name: 'Desserts' },
		{ id: 4, name: 'Dinner' },
		{ id: 5, name: 'Drinks' },
	]
	ingredient_labels = [
		{ id: 6, name: 'Beef' },
		{ id: 7, name: 'Chicken' },
		{ id: 8, name: 'Pasta' },
		{ id: 9, name: 'Pork' },
		{ id: 10, name: 'Salmon' },
	]
	diet_health_labels = [
		{ id: 11, name: 'Diabetic' },
		{ id: 12, name: 'Gluten Free' },
		{ id: 13, name: 'Healthy' },
		{ id: 14, name: 'Low Calorie' },
		{ id: 15, name: 'Low Fat' },
	]
	seasonal_labels = [
		{ id: 16, name: 'Father\'s Day' },
		{ id: 17, name: '4th of July' },
		{ id: 18, name: 'Entertaining' },
		{ id: 19, name: 'Summer Recipes' },
		{ id: 20, name: 'More Holidays & Events' },
	]
	dish_type_labels = [
		{ id: 21, name: 'Breads' },
		{ id: 22, name: 'Cakes' },
		{ id: 23, name: 'Salads' },
		{ id: 24, name: 'Smoothies' },
		{ id: 25, name: 'Soups, Stews & Chili' },
	]
	cooking_style_labels = [
		{ id: 26, name: 'BBQ & Grilling' },
		{ id: 27, name: 'Quick & Easy' },
		{ id: 28, name: 'Slow Cooker' },
		{ id: 29, name: 'Vegan' },
		{ id: 30, name: 'Vegetarian' },
	]

	world_cuisine_labels = [
		{ id: 31, name: 'Asian' },
		{ id: 32, name: 'Indian' },
		{ id: 33, name: 'Italian' },
		{ id: 34, name: 'Mexican' },
		{ id: 35, name: 'Southern' },
	]

	labels = [
		*mealtype_labels,
		*ingredient_labels,
		*diet_health_labels,
		*seasonal_labels,
		*dish_type_labels,
		*cooking_style_labels,
		*world_cuisine_labels,
	]
	Rails.logger.info("Creating #{labels.length} labels")
	@created_labels = labels.map {|label| Label.create(**label)}
	def find_label(id)
		@created_labels.detect do |created_label|
			created_label.id == id
		end
	end
	def find_labels_by_category(category_labels)
		category_labels.map do |label|
			find_label(label[:id])
		end
	end
	categories = [
		{ id: 1, name: 'Meal Type', labels: find_labels_by_category(mealtype_labels)},
		{ id: 2, name: 'Ingredient', labels: find_labels_by_category(ingredient_labels)},
		{ id: 3, name: 'Diet & Health', labels: find_labels_by_category(diet_health_labels)},
		{ id: 4, name: 'Seasonal', labels: find_labels_by_category(seasonal_labels)},
		{ id: 5, name: 'Dish Type', labels: find_labels_by_category(dish_type_labels)},
		{ id: 6, name: 'Cooking Style', labels: find_labels_by_category(cooking_style_labels)},
		{ id: 7, name: 'World Cuisine', labels: find_labels_by_category(world_cuisine_labels)},
	]
	Rails.logger.info("Creating #{categories.length} categories")
	created_categories = categories.map {|category| RecipeCategory.create(**category)}
	bbq_sauce_ingredient_group = IngredientGroup.create(
		name: 'For the barbecue sauce',
	)
	to_serve_ingredient_group = IngredientGroup.create(
		name: 'To serve',
	)
	recipes = [
		{
			id: 1,
			user_id: created_users[0].id,
			calories: 1000,
			cook_time: 1.hour.to_i,
			description: 'These mini burgers are absolutely stunning, all smoky from the bacon and paprika and with the sweet and sour hit from the homemade barbeque sauce. People often add too much to their burgers thinking it will enrich the flavor, but let me tell you, when it comes to burgers, less is more. Trust me.',
			number_of_servings: 4,
			prep_time: 30.minutes.to_i,
			recipe_category: 'bbq',
			total_time: (1.hour + 30.minutes).to_i,
			title: 'Smokey Pork Sliders with Barbecue Sauce',
			ingredients: [
				Ingredient.new(
					number: 4,
					name: 'strips of rindless smoked bacon, finely chopped',
				),
				Ingredient.new(
					name: 'Olive oil',
				),
				Ingredient.new(
					number: 1,
					name: 'shallot, peeled and finely chopped',
				),
				Ingredient.new(
					number: 1,
					name: 'smoked paprika',
					unit_of_measurement: 'tsp',
				),
				Ingredient.new(
					number: 1,
					name: 'ground pork',
					unit_of_measurement: 'pound',
				),
				Ingredient.new(
					name: 'sea salt',
				),
				Ingredient.new(
					name: 'freshly ground black pepper',
				),
				Ingredient.new(
					name: 'Olive oil',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					number: 1,
					name: 'small onion, peeled and finely diced',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					number: 2,
					name: 'garlic cloves, finely chopped',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					name: 'Sea salt and freshly ground black pepper',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					number: 1,
					name: 'brown sugar',
					unit_of_measurement: 'Tbsp',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					number: 1,
					name: 'smoked paprika',
					unit_of_measurement: 'tsp',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					number: 1,
					name: 'cider vinegar',
					unit_of_measurement: 'Tbsp',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					number: 2,
					name: 'Worcestershire sauce',
					unit_of_measurement: 'tsp',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					number: 6,
					name: 'tomato ketchup',
					unit_of_measurement: 'Tbsp',
					ingredient_group: bbq_sauce_ingredient_group,
				),
				Ingredient.new(
					name: 'Mini burger buns/bread rolls',
					ingredient_group: to_serve_ingredient_group
				),
				Ingredient.new(
					name: 'Baby Boston lettuce leaves, shredded',
					ingredient_group: to_serve_ingredient_group
				),
				Ingredient.new(
					name: 'Slices of smoked Cheddar cheese',
					ingredient_group: to_serve_ingredient_group
				),
				Ingredient.new(
					name: 'Slices of tomato',
					ingredient_group: to_serve_ingredient_group
				),
			],
			instructions: [
				RecipeInstruction.new(
					step: 0,
					body: 'First make the barbeque sauce. Heat the oil in a frying pan, add the onion and garlic with some salt and pepper and the sugar, and cook for 5 minutes until softened. Add the paprika nad stir to combine. Cook for 10-15 minutes until the onion is caramelizing, then add the vinegar and let it cook for a coupole of minuts. Add the Worcestershire sauce and tomato ketchup, mi well, and continue to cook for about 8 minutes until the sauce has reduced to a dropping consistency. Taste and adjust the seasoning as necessary. Remove from the heat and set aside.'
				),
				RecipeInstruction.new(
					step: 1,
					body: 'While th4 barbecue sauce is reducing, start preparing the burgers. Cook the bacon in an oiled pan for about 5 minutes until almost cooked through. Add the shallot and continue to cook for 5 minutes untul the shallot is tender and the bacon is crisp Sprinkle in the smoked paprika and mi well. Continue to cook for 1-2 minuts, then remove from the heat, draining off any excess fat on paper towels, and cool.'
				),
				RecipeInstruction.new(
					step: 2,
					body: 'Season the ground pork with salt and pepper and mix well with the cooked shallots and bacon. Shape into balls the size of golf balls and flatten into patties.'
				),
				RecipeInstruction.new(
					step: 3,
					body: 'Heat a large, heavy-bottomed frying pan with a little oil. Season the patties and cook them for 1-2 minutes on each side, basting with the juices until cooked through and colored. Turn off the heat and leave them to r3st in the pan. Top each patty with a slice of cheese, allowing it to melt slightly.'
				),
				RecipeInstruction.new(
					step: 4,
					body: 'Assemble your sliders in mini buns, layered with the barbecue sauce, lettuce, and slices of tomato. Any remaining barbecue sauce will keep in the fridge very well. Serve immediately.'
				),
			]
		}
	]
	Rails.logger.info("Creating #{recipes.length} recipes")
	# created_recipes = recipes.map {|recipe| Recipe.create!(**recipe)}
	recipe = Recipe.create(**recipes.first)
	puts recipe.errors.messages
	# created_recipes = recipes.first {|recipe| Recipe.create!(**recipe)}
end