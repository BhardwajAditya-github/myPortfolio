// Important Imports
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https = require('https');

// Basic configurations
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use("/route",express.static("public"));

// --- CODE --- //

app.post("/",function(request,response){
    const name = request.body.name;
    const email = request.body.mail;
    const message = request.body.message || "";
    const ipAddress = request.socket.remoteAddress;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: name,
                    LNAME: " ",
                    PHONE: " ",
                    IPADDRESS: ipAddress,
                    SKILLS: message
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/e82bbaf0dc";

    const options = {
        method:"POST",
        auth:"Aditya:c21d2e8a2f9ff09c94c60e16c7f36bab-us12"
    }

    const requ = https.request(url,options,function(res){

        if(res.statusCode === 200){
            console.log("Sent.");
        }
        else{
            console.log("Error occured.");
        }
        res.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    requ.write(jsonData);
    requ.end();
    

    response.redirect("/");
})

app.get("/",function(request,response){
    response.render("home");
})
app.get("/hire",function(request,response){
    response.render("hire");
})
app.get("/projects",function(request,response){
    response.render("projects");
})
app.get("/skills",function(request,response){
    response.render("skills");
})
app.get("/about",function(request,response){
    response.render("about");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port 3000");
})