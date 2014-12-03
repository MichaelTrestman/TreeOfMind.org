class PublicationsController < ApplicationController

  before_action :find_publication, only: [:show, :update, :destroy]

  def index
      if params[:query] == 'recent'
        render :json => Publication.limit(20)
      else
        results = Publication.where('abstract LIKE :query_downcase OR abstract LIKE :query_capitalize', query_downcase: "%#{params[:query].downcase}%", query_capitalize: "%#{params[:query].capitalize}%" )
        puts "********"
        p results
        render :json => results
      end
  end

  def update
    publication = Publication.find params[:id]
    if publication.update_attributes publication_params
      render :json => publication
    else
      render :json => {:errors => publication.errors.full_messages}, :status => :unprocessable_entity
    end
  end
  def show
    topics = @publication.topics
    authors = @publication.researchers
    # need to implement the below
    # taxons = @publication.taxons

    # distributions = @publication.distributions
    render :json => {
      topics: topics,
      authors: authors,
      # distributions: distributions,
      # taxons: taxons
      publication: @publication
    }

  end
  def destroy

  end

  private

  def find_publication
    @publication = Publication.find(params[:id]) if params[:id]
  end

  def publication_params
    params.require(:pub).permit(:title, :abstract, :author_first_name, :author_last_name)
  end
end