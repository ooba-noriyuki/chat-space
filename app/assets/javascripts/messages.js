$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image ? `<img src=${ message.image }>` : "";
    var html = `<div class="chat-body__messages-list" data-message_id=${message.id}>
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

   var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var group_last_message_id = $('.chat-body__messages-list:last').data("message_id")
      var message_last_id = group_last_message_id ? group_last_message_id : 0
    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json',
      data: {
       message: { id: message_last_id }
      }
    })
    .done(function(data) {
      var insertHTML = '';
      if (data.length) {
        data.forEach(function(message) {
          if (message.id > message_last_id) {
            insertHTML += buildHTML(message);
            $('.chat-body').append(insertHTML);
            $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight },'slow');
          }
        });
      }
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
   }} , 5 * 1000 );
});
