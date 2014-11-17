class Member::AddressesController < MemberController
  before_action :load_addressable, :only => [:index, :create]
  def index
    render :json => @addressable.addresses
  end

  def create
    address = Address.new address_params
    address.addressable = @addressable
    if address.save
      render :json => address
    else
      render :json => {:errors => address.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def update
    address = Address.find params[:id]
    if address.update_attributes address_params
      render :json => address
    else
      render :json => {:errors => address.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def destroy
    address = Address.find params[:id]
    address.destroy
    render :json => address
  end

  def search
    render :json => Address.get_addressable_within_radius(params[:zip], params[:radius], params[:type])
  end

  private
  def address_params
    params.require(:address).permit(:name, :street_1, :street_2, :city, :fax, :state, :zip, :addressable_type, :addressable_id)
  end
  def load_addressable
    @addressable = address_params[:addressable_type].classify.constantize.find address_params[:addressable_id]
  end
end
