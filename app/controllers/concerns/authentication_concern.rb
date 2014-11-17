

module AuthenticationConcern
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def serialized_current_user
    UserSerializer.new(current_user).as_json["user"]
  end

  def user_logged_in?
    current_user.present?
  end

  def logout
    session.clear
  end

  def login user
    session[:user_id] = user.id
  end

  def redirect_if_not_admin!
    redirect_to root_path unless user_logged_in? && admin?
  end

  def admin?
    current_user.is_a?(Admin)
  end

  def program?
    current_user.is_a?(Program)
  end

  def individual_provider?
    current_user.is_a?(IndividualProvider)
  end

  def redirect_to_dashboards!
    redirect_to admin_dashboard_index_path and return if user_logged_in? && admin?
    redirect_to member_dashboard_index_path and return if user_logged_in? && !admin?
  end

  def redirect_path
    admin? ? admin_dashboard_index_path : member_dashboard_index_path
  end

  def authenticate_user!
    redirect_to root_path unless current_user.present?
  end
end
