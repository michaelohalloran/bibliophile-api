// const Amazon = require('amazon-book-search');
// const amazonClient =  new Amazon(('awsKey','awsSecret'));

// // First 10 Results
// amazonClient.search('your thoughts on books', function(error, responses){
//     console.log(responses);
// });

// // Next 10 results (page 2)
// amazonClient.search('your thoughts on books', 2,function(error, responses){
//     console.log(responses);
// });

var amazon = require('amazon-product-api');
// Create client

var client = amazon.createClient({
  awsId: "aws ID",
  awsSecret: "aws Secret",
  awsTag: "aws Tag"
});

client.itemSearch({
    director: 'Quentin Tarantino',
    actor: 'Samuel L. Jackson',
    searchIndex: 'DVD',
    audienceRating: 'R',
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results){
    console.log('results: ', results);
  }).catch(function(err){
    console.log(err);
  });