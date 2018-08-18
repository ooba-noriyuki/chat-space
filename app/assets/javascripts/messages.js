$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src=${ message.image }>` : "";
    var html = `<div class="chat-body__messages-list">
                  <div class="chat__message-name">
                    ${ message.user_name }
                  </div>
                  <div class="chat__message-time">
                    ${ message.created_at }
                  </div>
                  <div class="chat__message-body">
                    <p class="chat__message-body__content">
                      ${ message.body }
                    </p>
                    ${ img }
                  </div>
                </div>`
    return html;
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
      $('.chat-body').append(html);
      $('#new_message')[0].reset();
      $('.chat-footer__form__send-btn').prop('disabled', false);
      $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight },'slow');
    })
    .fail(function(){
      alert('error');
    })
  })
});
