const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us19.api.mailchimp.com/3.0/lists/a3292a7e26";
  const option = {
    method: "POST",
    auth: "lais:0fa42c1a29a6b09a0d15e2d62cf60d45-us19"
  }

  const request = https.request(url, option, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running")
})




//API KEY
//0fa42c1a29a6b09a0d15e2d62cf60d45-us19

//LIST ID
//a3292a7e26
