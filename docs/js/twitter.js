
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

function add_choosen(username) {
    var choosen = [];
    $('#all-choosen li').each(function(i) {
        choosen.push($(this).text());
    });
    if (choosen.indexOf(username) < 0) {
        $("#all-choosen").append($('<li>' + username + '</li>'));
    }
}

function draft_one(username, tweet_id) {
    $("#choosen").empty();
    get_retweeters(tweet_id, function(user_ids){
        console.log("User IDs: " + user_ids);
        var random_result = Math.random();
        $("#random-result").empty().append(random_result);
        var user_id = user_ids[Math.floor(random_result * user_ids.length)];
        console.log(" - choosen one: " + user_id);
        get_user(user_id, function(data) {
            $("#choosen").append($('<img src="' + data.profile_image_url_https + '" class="avatar"/>'));
            $("#choosen").append($('<p>' + data.name + '</p>'));
            $("#choosen").append($('<p><small><img src="img/twitter-logo.svg" class="brand-icon"/>@' + data.screen_name + '</small></p>'));

            add_choosen(data.screen_name);
        });
    });
}

function draft_one_seed(username, tweet_id) {
    $("#choosen-seed").empty();
    get_retweeters(tweet_id, function(user_ids){
        console.log("User IDs:" + user_ids);
        
        var seed = $("#seed").val();
        if (seed) { Math.seedrandom(seed); } else { Math.seedrandom();}
        var random_result = Math.random();
        $("#random-result-seed").empty().append(random_result);
        var idx = Math.floor(random_result * user_ids.length);        
        get_user(user_ids[idx], function(data) {
            $("#choosen-seed").append($('<img src="' + data.profile_image_url_https + '" class="avatar"/>'));
            $("#choosen-seed").append($('<p>' + data.name + '</p>'));
            $("#choosen-seed").append($('<p><small><img src="img/twitter-logo.svg" class="brand-icon"/>@' + data.screen_name + '</small></p>'));

            add_choosen(data.screen_name);
        });
    });
}
