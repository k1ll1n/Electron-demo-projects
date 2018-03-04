let request = require('request');
let url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    request(url, (err, response, body) => {
        let bodyJson = JSON.parse(body);
        let title = bodyJson[0]['title'];
        let content = bodyJson[0]['content'];

        document.getElementById('quote').innerHTML = '<p>'+title+'</p>' + content;
    });
}

getQuote();

setInterval(getQuote, 5000);