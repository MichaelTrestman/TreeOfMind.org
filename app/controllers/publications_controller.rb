class PublicationsController < ApplicationController
  def index
      render :json => Publication.limit(20)
  end
  def update
    publication = Publication.find params[:id]
    if publication.update_attributes publication_params
      render :json => publication
    else
      render :json => {:errors => publication.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  private

  def publication_params
    params.require(:pub).permit(:title, :abstract, :author_first_name, :author_last_name)
  end
end