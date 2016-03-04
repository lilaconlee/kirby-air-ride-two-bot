var twit = require('twit');
var env = require('node-env-file');

env(__dirname + '/.env');

var t = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream = t.stream('statuses/filter', { track: 'kirby air ride two' });

stream.on('tweet', function (tweet) {
  console.log('-----------');
  console.log(tweet.text);
  console.log('-----');
  console.log(tweet);

  t.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
    if (err) {
      console.log(err);
    }
    console.log('retweeted for sure');
    console.log('-----------');
  });
});
