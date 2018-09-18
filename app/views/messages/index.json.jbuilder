if @new_message.present?
  json.array! @new_message do |message|
    json.user_name    message.user.name
    json.body         message.body
    json.id           message.id
    json.image    message.image.url
    json.created_at   message.created_at.to_s
  end
end
