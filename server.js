var express = require("express");
var bodyParser = require('body-parser')
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("public"))
app.set("views","display")
app.set("view engine", "ejs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);


//controller
app.get("/home", function(req,res){      
    res.render("home", {data:null});  
});


app.post("/home" ,urlencodedParser, function(req,res){
    //console.log(req.body)
    var num = calculate(req.body.weight,req.body.type)
    var data = {data:num};
    res.render("home",data)
});



//model
function calculate(weight, type){
   
    let LTS = [0.55,0.70,0.85,1];
    let LTM = [0.50,0.65,0.80,0.95];
    let LEF = [1,1.20,1.40,1.60,1.80];
    let FCP = [3.80,4.60]

    //console.log(type);
    //console.log(weight);

    var price = 0;

    if(type == "LTS"){
       if(weight < 1){
           price = LTS[0];
       }else if(weight < 2){
           price = LTS[1];
       }else if(weight < 3){
           price = LTS[2];
       }else{
           price = LTS[3];
       }

    }

    if(type == "LTM"){
        if(weight < 1){
            price = LTM[0];
        }else if(weight < 2){
            price = LTM[1];
        }else if(weight < 3){
            price = LTM[2];
        }else{
            price = LTM[3];
        }
 
     }

     if(type == "LEF"){
        if(weight < 1){
            price = LEF[0];
        }else if(weight < 2){
            price = LEF[1];
        }else if(weight < 3){
            price = LEF[2];
        }else{
            price = LEF[3];
        }
 
     }

     if(type == "FCP"){
        if(weight < 4){
            price = FCP[0];
        }else{
            price = FCP[1];
        }
 
     }
    
    console.log(price);
    return "Your shipping cost is of: $" + (weight*price).toFixed(2) + ". Thank you for your business!";
}