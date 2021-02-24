const express= require('express');
const bodyParser=require('body-parser');
const request= require('request');

const app= express();
app.use(bodyParser.urlencoded({ extended:true }));
app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
});
app.post('/', function(req, res){
    var crypto=req.body.crypto;
    var fiat=req.body.fiat;
    var amount=req.body.amount;
    var options={
        url:"https://apiv2.bitcoinaverage.com/convert/global",
        method:"GET",
        qs:{
            to:crypto,
            from:fiat,
            amount:amount
        }
        
    };
request(options, function(error,response,body){
    var data=JSON.parse(body);
    var price=data.price;
    var date=data.time;
    console.log(price);
    res.write("<p>The current time is "+date+"</p>");
    res.write("<h1> "+amount+" "+crypto+" is currently worth "+price+fiat+"</h1>");
    res.send();
});
});
app.listen(3000,function(){
    console.log("Server is running");
})