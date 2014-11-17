FactoryGirl.define do
  factory :individual_provider do
    email { Faker::Internet.email }
    password 'password'
    type 'IndividualProvider'
  end
  factory :program do
    email { Faker::Internet.email }
    password 'password'
    type 'Program'
  end
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
  factory :license do
    license_number "1337"
    kind "doctor"
    licenseable
  end
  factory :link do
    url "https://www.facebook.com/groups/306404792705460/"
    kind "Facebook"
    linkable
  end
  factory :phone do
    phone_number "661-133-7666"
    kind "cell"
    phoneable
  end
  factory :address do
    street_1 { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    zip { Faker::Address.zip_code }
  end
  factory :page do
    title { Faker::Lorem.characters(49) }
    abstract { Faker::Lorem.sentence }
  end
  factory :section do
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraph }
    page
  end
  factory :staff do
    title "doctor"
    name "jones"
  end
  factory :event do
    name { Faker::Lorem.sentence(rand(5))}
    starts { DateTime.now.to_s }
    ends { (DateTime.now + 2.days).to_s }
    repeat true
    description {Faker::Lorem.sentence(3)}
    cost{Faker::Number.number(2)}
    continuing_education {Faker::Lorem.word}
    website_link {Faker::Internet.url}
  end
  factory :ad do
    organization { Faker::Company.name }
    url { Faker::Internet.url }
    starts { Time.now }
    ends { Time.now + 3.days }
    trait(:active) {
      active true
    }
  end
  factory :package do
    name { Faker::Lorem.sentence(rand(4) + 1)}
    description {Faker::Lorem.paragraph(rand(3)+1)}
    price {rand(300) + 100}
    type { ['MembershipPackage', 'AdvertisingPackage'].sample }
    duration_count { rand(10) + 1}
    duration_type { ['weeks', 'months', 'years'].sample }
  end
  factory :membership_package do
    name { Faker::Lorem.sentence(rand(4) + 1)}
    description {Faker::Lorem.paragraph(rand(3)+1)}
    price {rand(300) + 100}
    type { 'MembershipPackage'}
  end
  factory :training_opportunity do
    employer_name { Faker::Company.name }
    employer_website { Faker::Internet.domain_name }
    employer_location { Faker::Address.city }
    position_name { Faker::Name.title }
    job_description { Faker::Lorem.sentence }
    responsibilities { Faker::Lorem.sentence }
    requirements { Faker::Lorem.sentence }
    contact_phone { Faker::PhoneNumber.phone_number }
    contact_email { Faker::Internet.email }
    contact_website { Faker::Internet.domain_name }
    to_apply { Faker::Internet.domain_name }
    poster_initials { Faker::Lorem.characters(3)}
  end
  factory :organization do
    name {Faker::Company.name}
  end
  factory :group do
    name { Faker::Company.name }
    kind { ['Paid', 'Free', 'Volunteer'].sample }
    description { Faker::Lorem.paragraph }
    cost { rand(300) + 100 }
    join_details { Faker::Lorem.paragraph }
  end
  factory :contact do
    name { Faker::Name.title }
    email { Faker::Internet.email }
    website { Faker::Internet.domain_name }
    contact_hours { Faker::Lorem.sentence }
  end
  factory :tag do
    name { Faker::Lorem.word }
  end
end
