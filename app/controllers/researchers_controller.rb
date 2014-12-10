class ResearchersController < ApplicationController
  before_action :find_researcher, only: [:show, :update, :destoy]

  def index
    if !params[:query] || params[:query] == 'recent'
      render :json => Researcher.limit(20)
    else
      results = Researcher.where('
        first_name LIKE :query_downcase
        OR
        first_name LIKE :query_capitalize
        OR
        last_name LIKE :query_downcase
        OR
        last_name LIKE :query_capitalize
      ', query_downcase: "%#{params[:query].downcase}%", query_capitalize: "%#{params[:query].capitalize}%"
      )
    end
  end
  def show
    pubs = @researcher.publications
    topics = []
    pubs.each do |pub|
      tops = pub.topics
      tops.each do |top|
        topics << top unless topics.include? top
      end
    end
    render :json => {
      researcher: @researcher,
      publications: @researcher.publications,
      topics: topics
    }
  end


  private
  def find_researcher
    @researcher = Researcher.find(params[:id]) if params[:id]
  end
end