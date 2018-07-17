class IngredientsController < ApplicationController
  before_action :set_ingredient, only: [:show, :edit, :update, :destroy]

  # GET /ingredients
  # GET /ingredients.json
  def index
    @ingredients = Ingredient.all
    respond_to do |format|
      format.json { render json: @ingredients.to_json }
    end
  end

  # GET /ingredients/1
  # GET /ingredients/1.json
  def show
    respond_to do |format|
      format.json { render json: @ingredient.to_json }
    end
  end

  # GET /ingredients/new
  def new
    @ingredient = Ingredient.new
    respond_to do |format|
      format.json { render json: @ingredient.to_json }
    end
  end

  # POST /ingredients
  # POST /ingredients.json
  def create
    @ingredient = Ingredient.new(ingredient_params)

    respond_to do |format|
      if @ingredient.save
        format.json { render json: @ingredient.to_json }
      else
        format.json { render json: @ingredient.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ingredients/1
  # PATCH/PUT /ingredients/1.json
  def update
    respond_to do |format|
      if @ingredient.update(ingredient_params)
        format.json { render json: @ingredient.to_json }
      else
        format.json { render json: @ingredient.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ingredients/1
  # DELETE /ingredients/1.json
  def destroy
    @ingredient.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ingredient
      @ingredient = Ingredient.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ingredient_params
      params.require(:ingredient).permit(:recipe_id, :name, :number, :unitOfMeasurement)
    end
end
