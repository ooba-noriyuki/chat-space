FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image { Rack::Test::UploadedFile.new(Rails.root.join("public/images/image.jpg"), "image/jpg") }
    user
    group
  end
end
