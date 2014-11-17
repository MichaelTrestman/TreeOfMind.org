class TrainingOpportunitySerializer < ActiveModel::Serializer
  attributes :id, :employer_name, :employer_website, :employer_location, :position_name, :job_description, :responsibilities, :requirements, :contact_phone, :contact_email, :contact_website, :to_apply, :poster_initials, :created_at, :updated_at
end
