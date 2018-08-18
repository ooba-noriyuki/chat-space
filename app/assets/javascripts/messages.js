$(function(){
  function buildHTML(message){
    var img = message.image? `<img src=${message.image}>` : "";
    var html = `<div class="chat__message-name">
                  ${message.user_name}
                </div>
                <div class="chat__message-time">
                  ${message.created_at}
                </div>
                <div class="chat__message-body">
                  ${message.body}
                </div>
                <div class="chat__message-body">
                  ${img}
                </div>`
    return html;
  }

  function scroll(messagebox){
    messagebox.animate({scrollTop: $('.chat-body__messages-list')[0].scrollHeight},'fast');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-body__messages-list').append(html);
      $('#new_message')[0].reset();
      $('.chat-footer__form__send-btn').prop('disabled', false);
      scroll($('.chat-body__messages-list'));
    })
    .fail(function(){
      alert('error');
    })
  })
});
