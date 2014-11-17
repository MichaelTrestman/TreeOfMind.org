require 'rails_helper'
describe Admin::PagesController do
  let(:page) { FactoryGirl.create :page }
  describe "GET #index" do
    it 'returns all pages' do
      get :index
      expect(response.body).to eq({"pages" => ActiveModel::ArraySerializer.new(Page.all)}.to_json)
    end
  end
  describe "Put #update" do
    let(:title) { "Welcome!" }
    it 'should update a the title field' do
      expect {
        put :update, :id => page.id, page: {title: title}
      }.to change { page.reload.title }.from(page.title).to(title)
    end
  end
end
