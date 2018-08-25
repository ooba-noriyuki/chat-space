$(document).on('turbolinks:load', function(){
  $(function(){
    var searchResult = $('#user-search-result');
    var addedUsers = $('#chat-group-users');

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      ${user.name}
                    </p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`
    searchResult.append(html);
    }

    function appendNoUser(message) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      ${message}
                    </p>
                  </div>`
    searchResult.append(html);
    }

    function appendAddUser(userId, userName) {
      var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${userId}">
                    <input name="group[user_ids][]", type='hidden', value='${userId}'>
                      <p class="chat-group-user__name">
                        ${userName}
                      </p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
    addedUsers.append(html);
    }

    $('#user-search-field').on('keyup', function(){
      var input = $(this).val();
      if((input != "") && (input != " "));
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        } else {
            appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function(){
        alert("検索に失敗しました");
      })
    });

    $('#user-search-result').on("click", ".chat-group-user__btn--add", function(){
      var userId = $(this).data("user-id");
      var userName = $(this).data("user-name");
      appendAddUser(userId, userName);
      $(this).parent().remove();
    });

    $('#chat-group-users').on("click", ".js-remove-btn", function(){
      $(this).parent().remove();
    });
  });
});
