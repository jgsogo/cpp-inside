
function get_followers(username) {
    var url_followers = "https://twitter.com/" + username + "/followers";
    
    var twitter_username = 'jgsogo';


    $.ajax({
      url: "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names="+twitter_username,
      dataType : 'jsonp',
      crossDomain : true
    }).done(function(data) {
        alert("!!!!");
        alert(data);
      $("h3 strong").text(data[0]['followers_count']);
    });

}

function get_retweeters(tweet_id, on_ids) {
    console.log("retweeters of: " + tweet_id);
    $.get({
        url: "twitter/retweeters?id=" + tweet_id
    }).done(function(data) {
        var json = $.parseJSON(data);
        console.log(json);
        on_ids(json.ids);
    });
}

function get_user(user_id, on_user_data) {
    $.get({
        url: "twitter/user?id=" + user_id
    }).done(function(data) {
        var json = $.parseJSON(data);
        on_user_data(json);
    });
}

function draft_one(username, tweet_id) {
    $("#choosen").empty();
    get_retweeters(tweet_id, function(user_ids){
        console.log(user_ids);
        var user_id = user_ids[Math.floor(Math.random() * user_ids.length)];
        get_user(user_id, function(data) {
            $("#choosen").append($('<img src="' + data.profile_image_url_https + '" class="avatar"/>'));
            $("#choosen").append($('<p>' + data.name + '</p>'));
            $("#choosen").append($('<p>@' + data.screen_name + '</p>'));

            $("#all-choosen").append($('<li>@' + data.screen_name + '</li>'));
        });
    });
}