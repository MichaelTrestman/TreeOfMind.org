class Member::LinksController < MemberController
	before_action :load_linkable, :only => [:index, :create]
	def index
		render :json => @linkable.links
	end

	def create
		link = Link.new link_params
		link.linkable = @linkable
		if link.save
			render :json => link
		else
			render :json => {:errors => link.errors.full_messages}, :status => :unprocessable_entity
		end
	end

	def update
		link = Link.find params[:id]
		if link.update_attributes link_params
			render :json => link
		else
			render :json => {:errors => link.errors.full_messages}, :status => :unprocessable_entity
		end
	end

	def destroy
		link = Link.find params[:id]
		link.destroy
		render :json => link
	end

	private
	def link_params
		params.require(:link).permit(:url, :kind, :linkable_type, :linkable_id)
	end
	def load_linkable
		@linkable = params[:link][:linkable_type].classify.constantize.find params[:link][:linkable_id]
	end
end
