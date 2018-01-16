var server = require("./server");
var port = process.env.PORT || 3001;
server(port);
console.log("Server running on port " + port);
