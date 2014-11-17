class ContactsController < ApplicationController
  before_action :load_contactable, :only => [:index, :create]
  def index
    render :json => @contactable.contacts
  end

  def create
    contact = Contact.new contact_params
    contact.contactable = @contactable
    if contact.save
      render :json => contact
    else
      render :json => {:errors => contact.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def update
    contact = Contact.find params[:id]
    if contact.update_attributes contact_params
      render :json => contact
    else
      render :json => {:errors => contact.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def destroy
    contact = Contact.find params[:id]
    contact.destroy
    render :json => contact
  end

  private
  def contact_params
    params.require(:contact).permit(:name, :email, :website, :contact_hours, :contactable_type, :contactable_id)
  end
  def load_contactable
    @contactable = contact_params[:contactable_type].classify.constantize.find contact_params[:contactable_id]
  end
end
