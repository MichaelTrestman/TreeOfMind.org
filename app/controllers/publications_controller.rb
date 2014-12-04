class PublicationsController < ApplicationController

  before_action :find_publication, only: [:show, :update, :destroy]

  def index
      if params[:query] == 'recent'
        render :json => Publication.all
      else
        results = Publication.where('
          abstract LIKE :query_downcase
          OR
          abstract LIKE :query_capitalize
          OR
          abstract LIKE :query_upcase
          OR
          title LIKE :query_downcase
          OR
          title LIKE :query_capitalize
          OR
          title LIKE :query_upcase
          ', query_downcase: "%#{params[:query].downcase}%", query_capitalize: "%#{params[:query].capitalize}%" ,
            query_upcase: "%#{params[:query].upcase}%" )
        render :json => results
      end
  end
  def create
    pubber = Publication.new publication_params
    if pubber.save
      render :json => pubber
    else
      render :json => {message: 'oh shit creation failed'}
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
    pubber = Publication.find params[:id]
    pubber.destroy
    render :json => pubber
  end

  private

  def find_publication
    @publication = Publication.find(params[:id]) if params[:id]
  end

  def publication_params
    params.require(:pub).permit(:title, :abstract)
  end
end