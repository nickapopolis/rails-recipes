class ApplicationController < ActionController::Base
  #before_action :authenticate_user!, :render_index
  before_action :render_index, if: -> { request.format.html? }
  protect_from_forgery with: :exception

  def render_index
    respond_to do |format|
      format.html { render 'pages/index' }
    end
  end
end
