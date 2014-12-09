class TaxonsController < ApplicationController
  before_action :find_taxon, only: [:show, :update, :destroy]

  def index
    if params[:query] == 'recent'
      taxa = Taxon.all
      # render :json => Taxon.all
    else
      taxa = Taxon.where('
          name LIKE
            :query_downcase
          OR
          name LIKE
            :query_capitalize
          OR
          name LIKE
            :query_upcase
          ', query_downcase: "%#{params[:query].downcase}%", query_capitalize: "%#{params[:query].capitalize}%",
            query_upcase: "%#{params[:query].upcase}%"
          )
    end
      results = taxa.map { |taxon| {taxon: taxon, supertaxon: taxon.supertaxon, subtaxa: taxon.subtaxons} }

      render :json => taxa
  end


  def create
    taxon = Taxon.new taxon_params
    if taxon.save
      render :json => {taxon: taxon, supertaxon: taxon.supertaxon, subtaxa: taxon.subtaxons}
    else
      render :json => {message: 'oh shit creation failed'}
    end
  end
  def update
    if @taxon.update_attributes taxon_params
      render :json => {taxon: @taxon, supertaxon: @taxon.supertaxon, subtaxa: @taxon.subtaxons}
    else
      render :json => {:errors => publication.errors.full_messages}, :status => :unprocessable_entity
    end
  end
  def show
    render :json => {taxon: @taxon, supertaxon: @taxon.supertaxon, subtaxa: @taxon.subtaxons}
  end

  def destroy
    @taxon.destroy
    render :json => @taxon
  end



  private
  def find_taxon
    @taxon = Taxon.find(params[:id]) if params[:id]
  end
end