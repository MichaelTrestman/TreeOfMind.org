class AdminController < ActionController::Base
  include AuthenticationConcern
  protect_from_forgery with: :exception
  before_filter :redirect_if_not_admin!
  helper_method :current_user, :serialized_current_user, :user_logged_in?, :admin?
end
