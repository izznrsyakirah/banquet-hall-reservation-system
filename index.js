var express = require('express');
var path = require("path");
var routes = require("./routes");

var app = express();

app.set("port", process.env.PORT || 5000);

/*/app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname}); 
});*/

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

app.listen(app.get("port"), () => { 
    console.log("Now listening on port " + app.get("port")); 
});
