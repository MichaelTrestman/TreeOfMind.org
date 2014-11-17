class Admin::MembersController < ApplicationController
  def index
    @members = params[:type].classify.constantize.all
    render :json => {:members => ActiveModel::ArraySerializer.new(@members)}
  end
end
