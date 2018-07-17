class RecipeimagesController < ApplicationController
  before_action :set_recipeimage, only: [:show, :edit, :update, :destroy]

  # GET /recipeimages
  # GET /recipeimages.json
  def index
    @recipeimages = Recipeimage.all
    respond_to do |format|
      format.json { render json: @recipeimages.to_json }
    end
  end

  # GET /recipeimages/1
  # GET /recipeimages/1.json
  def show
    respond_to do |format|
      format.json { render json: @recipeimage.to_json }
    end
  end

  # GET /recipeimages/new
  def new
    @recipeimage = Recipeimage.new
    respond_to do |format|
      format.json { render json: @recipeimage.to_json }
    end
  end

  # POST /recipeimages
  # POST /recipeimages.json
  def create
    @recipeimage = Recipeimage.new(recipeimage_params)

    respond_to do |format|
      if @recipeimage.save
        format.json { render json: @recipeimage.to_json }
      else
        format.json { render json: @recipeimage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /recipeimages/1
  # PATCH/PUT /recipeimages/1.json
  def update
    respond_to do |format|
      if @recipeimage.update(recipeimage_params)
        format.json { render json: @recipeimage.to_json }
      else
        format.json { render json: @recipeimage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /recipeimages/1
  # DELETE /recipeimages/1.json
  def destroy
    @recipeimage.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipeimage
      @recipeimage = Recipeimage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recipeimage_params
      params.require(:recipeimage).permit(:recipe_id)
    end
end
