class Admin::DashboardController < AdminController
  def index
    @serialized_user = UserSerializer.new(current_user).as_json["user"]
  end
end
