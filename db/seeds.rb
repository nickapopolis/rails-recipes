# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

if ENV.fetch('RAILS_ENV') == 'development'

  def read_config(file_path)
    YAML.load(
      ERB.new(File.read(file_path)).result
    )
  end

  def create_seeds(config_name)
    seeds = read_config("config/seed/#{config_name}.yml")
    Rails.logger.info("Creating #{seeds.length} #{config_name}")
    result = seeds.transform_values do |seed|
      yield seed
    end
    Rails.logger.info("Created #{config_name}")
    result
  end

  created_users = create_seeds('users') do |user|
    User.create!(
      id: user['id'],
      first_name: user['first_name'],
      last_name: user['last_name'],
      email: user['email'],
      password: user['password'],
    )
  end

  created_labels = create_seeds('labels') do |label|
    Label.create!(
      id: label['id'],
      name: label['name'],
    )
  end

  created_categories = create_seeds('recipe_categories') do |recipe_category|
    RecipeCategory.create(
      id: recipe_category['id'],
      name: recipe_category['name'],
      labels: recipe_category.fetch('labels', []).map do |label|
        created_labels.fetch(label)
      end
    )
  end

  created_recipes = create_seeds('recipes') do |recipe|
    ingredient_groups = recipe.fetch('ingredient_groups', {}).map do |ingredient_group|
      IngredientGroup.new(
        name: ingredient_group['name'],
        ingredients: ingredient_group.fetch('ingredients', []).map do |ingredient|
          Ingredient.new(
            number: ingredient['number'],
            name: ingredient['name'],
            unit_of_measurement: ingredient['unit_of_measurement'],
          )
        end
      )
    end
    
    instructions = recipe.fetch('instructions', []).map do |instruction, step|
      RecipeInstruction.new(body: instruction, step: step)
    end
    labels = recipe.fetch('labels', []).map do |label|
      created_labels.fetch(label)
    end

    created_recipe = Recipe.create!(
      id: recipe['id'],
      user_id: recipe['user_id'],
      calories: recipe['calories'],
      cook_time: recipe['cook_time'],
      description: recipe['description'],
      number_of_servings: recipe['number_of_servings'],
      prep_time: recipe['prep_time'],
      recipe_category: recipe['recipe_category'],
      total_time: recipe['total_time'],
      title: recipe['title'],
      ingredient_groups: ingredient_groups,
      instructions: instructions,
      labels: labels,
    )

    recipe.fetch('images', []).each do |recipe_image|
      created_recipe.images.attach(io: File.open(recipe_image['filepath']), filename: recipe_image['filename'])
    end
    created_recipe
  end
end