const req = require('request');
var http = require('http');

http.createServer(function (request, res) {
     console.log(request.method);
    var url = request.url;
    var httpMethod = request.method;
    if(url === '/all-data' && (httpMethod == 'GET'))
 {   req.get("http://localhost/custom_rest_php_api/sample.php",(e,r,b)=>{
        if(e){
            console.log('error occured');
        }
        res.end(b);
    });
}

else if((url == '/post-data') && (httpMethod == 'POST')){

let body = '';
request.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    request.on('end', function() {
       var formData = body;
       callExternalPostReq(JSON.parse(formData));
    });

    function callExternalPostReq(formData){
     
      console.log(formData);
        req.post({url:'http://localhost/custom_rest_php_api/sample.php',formData : formData}, function optionalCallback(err, httpResponse, body) {
       if(err){
            console.log("error occured from post req");
            console.log(err);
        }
        res.end("Success in CREATING RESOURCE USING POST METHOD");
    })
    
      
/*
    axios.post('http://localhost/custom_rest_php_api/sample.php', demo).then(function (response) {
    console.log("axios response is");    
    console.log(response);
      })
      .catch(function (error) {
        console.log("axios error is");
        console.log(error);
      });*/
    }
   



}




}).listen(3000, function() {
    console.log("server start at port 3000"); // The server object listens on port 3000
});