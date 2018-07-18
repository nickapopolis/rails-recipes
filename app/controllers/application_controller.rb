class ApplicationController < ActionController::Base
  respond_to :json, :html
  protect_from_forgery with: :exception
  before_action :render_index, if: -> { request.format.html? }

  def render_index
    respond_to do |format|
      format.html { render 'pages/index' }
    end
  end
end
