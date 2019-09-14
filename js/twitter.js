
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