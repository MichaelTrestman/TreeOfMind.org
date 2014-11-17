class ApplicationController < ActionController::Base
  include AuthenticationConcern
  protect_from_forgery with: :exception
  helper_method :current_user, :user_logged_in?, :admin?
end
