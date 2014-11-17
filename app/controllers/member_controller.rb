class MemberController < ActionController::Base
  include AuthenticationConcern
  before_filter :authenticate_user!
  protect_from_forgery with: :exception
  helper_method :current_user, :serialized_current_user, :user_logged_in?, :program?, :admin?
end
