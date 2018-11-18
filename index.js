var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
const http=require('http');
var server=http.createServer(app);
const port=8002;

app.get('/', function(req, res){
var mediaUrls=new Array();
var count=0,countImages=0;
var urls = ['https://www.instagram.com/9gag/','https://www.instagram.com/cistheta.the.page/','https://www.instagram.com/gamingdnazone/','https://www.instagram.com/mememandir/','https://www.instagram.com/mytherapistsays/','https://www.instagram.com/fuckjerry/','https://www.instagram.com/girlwithnojob/','https://www.instagram.com/betches/'];
urls.forEach(url=>{
request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
            var textNode = $('body > script').map((i, x) => x.children[0])
                                         .filter((i, x) => x && x.data.match(/window._sharedData =/)).get(0);

        var ProfilePage=JSON.parse(textNode.data.substring(textNode.data.indexOf('{'),textNode.data.length-1)).entry_data. ProfilePage;
        var user=ProfilePage[0].graphql.user;
        var media=user.edge_owner_to_timeline_media.edges;
        console.log(media.length);
        media=media.filter(nodes=>nodes.node.__typename=='GraphImage');
        var url1=media.map(nodes=>{
            

            countImages++;
            var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
            };

            download(nodes.node.display_url, "images/"+countImages+".jpg", function(){
            console.log('done');
            });
            return nodes.node.display_url;


        });
        
        mediaUrls= mediaUrls.concat(url1);
        count++;
        console.log(count);
    }
    else{
        count++;
    }
    if(count==urls.length){
        var array=new Array();
        for(i=0;i<mediaUrls.length;i++){
            var obj={
                id:i,
                url:mediaUrls[i],
                text:'abc',
                category:''
            };
            array.push(obj);
            if(i==mediaUrls.length-1)
                res.send(array);
        }    
    }
});
}) ;

})


console.log('Magic happens on port 8000');
server.listen(port,function(){
    console.log("Server running at port "+port);
});
