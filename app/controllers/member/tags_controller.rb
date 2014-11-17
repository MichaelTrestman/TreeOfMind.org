 class Member::TagsController < MemberController
  before_action :load_taggable, :only => [:index, :create]
  def index
    render :json => @taggable.tags
  end

  def create
    collection = []
    tag_params[:name].split(',').each do |tag|
      tag = Tag.create :name => tag, :taggable => @taggable
      tag.taggable = @taggable
      collection << tag
    end
    render :json => collection
  end


  def destroy
    tag = Tag.find params[:id]
    tag.destroy
    render :json => tag
  end

  private
  def tag_params
    params.require(:tag).permit(:name, :taggable_id, :taggable_type)
  end
  def load_taggable
    @taggable = params[:tag][:taggable_type].classify.constantize.find params[:tag][:taggable_id]
  end
end
