class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :update, :destroy]

  # GET /recipes.json
  def index
    @recipes = Recipe.all
    respond_to do |format|
      format.json { render json: @recipes.to_json}
    end
  end

  # GET /recipes/1.json
  def show
    respond_to do |format|
      format.json { render json: @recipe.to_json}
    end
  end

  # GET /recipes/new.json
  def new
    @recipe = Recipe.new
    respond_to do |format|
      format.json { render json: @recipe.to_json}
    end
  end

  # POST /recipes.json
  def create
    @recipe = Recipe.new(recipe_params)
    respond_to do |format|
      if @recipe.save
        format.json { render json: @recipe.to_json}
      else
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /recipes/1.json
  def update
    respond_to do |format|
      if @recipe.update(recipe_params)
        format.json { render json: @recipe.to_json }
      else
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /recipes/1
  # DELETE /recipes/1.json
  def destroy
    @recipe.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recipe_params
      params
        .require(:recipe)
        .permit(:cookTime,
          :datePublished,
          :description,
          :calories,
          :prepTime,
          :recipeCategory,
          :recipeInstructions,
          :numberOfServings,
          :totalTime,
          :user_id
        )
    end
end
