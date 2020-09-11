const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
  var firstName=req.body.fName;
  var secondName=req.body.sName;
  var email=req.body.email;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: secondName
        }
      }
    ]
  }
  var jsonData=JSON.stringify(data);
const url="https://us10.api.mailchimp.com/3.0/lists/b49599d8f9";
const options={
  method:"POST",
  auth:"akash:805f68d09cd45dda77c5bdd81332c605-us10"
}
  var request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
  }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
request.write(jsonData);
request.end();
  // res.send("Done");
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("server running on port 3000");
});
// ApiKey
// 805f68d09cd45dda77c5bdd81332c605-us10
// ListID
// b49599d8f9
