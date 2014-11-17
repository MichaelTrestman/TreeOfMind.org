class Member::UsersController < MemberController

  def update
    if current_user.update_attributes(user_params)
      render json: UserSerializer.new(current_user).as_json
    else
      render :json => {:errors => current_user.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :about, :email, :password)
  end

end
