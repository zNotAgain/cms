var Twit = require('twit');

var T = new Twit({
    consumer_key:         '0o9YKUkhH7KQVQXbB4C3xd1X9',
    consumer_secret:      'XYt4jeASyjDWKCWFkbXXKTBzkU8ltFYqdflbKXN7lMjGlFDIqL',
    access_token:         '1058252169000808450-fTleRUGQpLboVVLMLerhsPiBbcNydO',
    access_token_secret:  'UrFNe1r50stK2Nnj4ffXL2AkONuGVwM0upvY4UYthsUIW',
});

module.exports.postTwit = function (msg) {
    // post status
    // https://twitter.com/ssadtwitalert
    var tweet = { status: msg };
    T.post('statuses/update', tweet, tweeted);
};

function tweeted (err, data, response) {
    if (err) {
        console.log("Tweet denied :( \n"+ err);
    }
    else {
        // console.log(data);
        console.log("Tweet posted!");
    }
};