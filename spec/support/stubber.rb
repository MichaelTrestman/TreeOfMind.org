module Stubber
  def stub_current_member_user user
    allow_any_instance_of(MemberController).to receive(:current_user) { user }
    allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
  end
  def stub_current_admin_user user
    allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
    allow_any_instance_of(MemberController).to receive(:current_user) { user }
    allow_any_instance_of(AdminController).to receive(:current_user) { user }
  end
end
