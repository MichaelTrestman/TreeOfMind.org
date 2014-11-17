class WelcomeController < ApplicationController

  def index
    # @serialized_user = current_user.present? ? UserSerializer.new(current_user).as_json["user"] : {}
  end

  def about
  end

  def show
    page = Page.find_by_url params[:url]
    render :json => page
  end
end
