class ResearchersController < ApplicationController
  before_action :find_researcher, only: [:show, :update, :destoy]

  def index
    render :json => Researcher.limit(20)
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