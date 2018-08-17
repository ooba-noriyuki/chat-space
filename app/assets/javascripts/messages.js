$(function(){
  function buildHTML(message){
    var html = `<div class="chat__message-name">
                  ${message.user_name}
                </div>
                <div calss="chat__message-time">
                  ${message.created_at}
                </div>
                <div class="chat__message-body">
                  ${message.body}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-body__messages-list").append(html);
      $(".chat-footer__form__message").val('');
    })
    .fail(function(){
      alert('error');
    })
  })
});
