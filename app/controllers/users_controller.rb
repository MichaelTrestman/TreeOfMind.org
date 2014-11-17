class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      login user
      render json: { redirect: member_dashboard_index_path }
    else
      render :json => {:errors => user.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :type, :first_name, :last_name, :about)
  end
end
