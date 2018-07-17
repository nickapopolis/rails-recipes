class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
    respond_to do |format|
      format.json { render json: @reviews.to_json }
    end
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
    respond_to do |format|
      format.json { render json: @review.to_json }
    end
  end

  # GET /reviews/new
  def new
    @review = Review.new
    respond_to do |format|
      format.json { render json: @review.to_json }
    end
  end

  # POST /reviews
  # POST /reviews.json
  def create
    @review = Review.new(review_params)
    respond_to do |format|
      if @review.save
        format.json { render json: @review.to_json }
      else
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    respond_to do |format|
      if @review.update(review_params)
        format.json { render json: @review.to_json }
      else
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params.require(:review).permit(:recipe_id)
    end
end
