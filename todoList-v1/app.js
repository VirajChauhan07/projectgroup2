const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();

var items=["Buy Food","Cook Food","Eat Food"];
var workItems=[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));  

app.get("/", function (req, res) {

let day = date.getDay();

    res.render("list", {listTitle: day,newListItems: items});
});

app.post("/",function(req, res){
    
    var item = req.body.newItem

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }    
});

// app.post("/work", function(req,res){
    
//     let item = req.bodynewItem;
//     worksItems.push(item);
//     res.redirect("/work");
// });

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List", newListItems:workItems})
});

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server started at port 3000");
});







// switch (currentDay) {
    //     case 0:
    //         Day = "Sunday";
    //         break;

    //     case 1:
    //         Day = "Monday";
    //         break;

    //     case 2:
    //         Day = "Tuesday";
    //         break;

    //     case 3:
    //         Day = "Wednesday";
    //         break;

    //     case 4:
    //         Day = "Thursday";
    //         break;

    //     case 5:
    //         Day = "Friday";
    //         break;

    //     case 6:
    //         Day = "Saturday";
    //         break;

    //     default:
    //         console.log("Error: Current Date is equal to : " + currentDay);
    //         break;
    // }