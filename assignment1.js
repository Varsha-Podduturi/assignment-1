const express = require('express');
const bodyParser = require("body-parser");
const MenchiesStore = require("./assignment1Menchies");


// Create a new express application instance
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let totalOrders = [];

// endpoint where we can see total orders
app.get("/store/orders",(req,res) =>{
    
    const order_data = totalOrders
    console.log("ordeer-data", order_data)
    res.json(order_data)
})

let oOrders = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From || req.body.from;
    if(!oOrders.hasOwnProperty(sFrom)){

        oOrders[sFrom] = new MenchiesStore();
    }
    let sMessage = req.body.Body|| req.body.body;
    let aReply = oOrders[sFrom].handleInput(sMessage);

    if(oOrders[sFrom].isDone()){
        totalOrders.push(oOrders[sFrom].getOrderData())
        delete oOrders[sFrom];
    }
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");
});

// endpoint where we can see total orders
app.get("/store/orders",(req,res) =>{
    
    console.log(oOrders)
})

var port = process.env.PORT || parseInt(process.argv.pop()) || 3002;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
