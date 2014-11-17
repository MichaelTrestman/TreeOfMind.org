require 'rails_helper'

describe Package do

  context 'validations' do

    [:name, :price, :type].each do |attr|
      it { should validate_presence_of attr}
    end

  end

end

describe AdvertisingPackage  do
  context 'validations' do
    [:duration_type, :duration_count].each do |attr|
      it { should validate_presence_of attr }
    end
  end
end
