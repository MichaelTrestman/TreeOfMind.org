FactoryGirl.define do
  factory :user, :aliases => [:phoneable, :licenseable, :linkable] do
    email { Faker::Internet.email }
    type { ['IndividualProvider', 'Program'].sample }
    password 'password'
  end
  factory :admin do
    email { Faker::Internet.email }
    password 'password'
    type 'Admin'
  end
  factory :link do
    url "https://www.facebook.com/groups/306404792705460/"
    kind "Facebook"
    linkable
  end
  factory :tag do
    name { Faker::Lorem.word }
  end
  factory :publication do
    title { Faker::Lorem.sentence(rand(6)+1) }
    abstract { Faker::Lorem.paragraph(rand(6)+3) }
  end
  factory :topic do
    title { Faker::Lorem.sentence(rand(6)+1) }
  end
end
