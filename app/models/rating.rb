class Rating < ApplicationRecord
  belongs_to :applicant
  belongs_to :user

  # TODO Validate rating values
end
