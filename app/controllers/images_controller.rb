class ImagesController < ApplicationController
  before_action :load_imageable

  def new
    @image = Image.new
  end

  def create
    @image = Image.new image_params
    @image.imageable = @imageable
    if @image.save
      redirect_to :back
    else
      render :new
    end
  end

  private
  def image_params
    params.require(:image).permit(:attachment, :name)
  end
  def load_imageable
    @imageable = params[:imageable_type].classify.constantize.find params[:imageable_id]
  end
end
