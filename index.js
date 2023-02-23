const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");
var time = new Date();

// function extension(val) { let extension = val.split(".").pop()
// return `text/${extension}` }

// http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type': extension(req.url)});
//   fs.readFile('static' + req.url, function(err, data) {
//     if(err){
//       res.end('There was an error Loading the page')
//     }else{
//       res.end(data.toString());
//     }
//   })
//   console.log(req.url)
// }).listen(8080);
// console.log("Listening on port 8080");

function returnFile(pathname, res, onError) {
  fs.readFile(pathname, function (err, data) {
    if (err) {
      onError(err);
      console.log(`Couldn't load ${pathname} at ${time.getHours() +
        ":" +
        time.getMinutes() +
        ":" +
        time.getSeconds()} on the ${time.getDate() +
        "-" +
        time.getMonth() +
        "-" +
        time.getFullYear()}`)
    } else {
      res.end(data.toString());
      console.log(`${pathname} ${time.getHours() +
        ":" +
        time.getMinutes() +
        ":" +
        time.getSeconds()} on the ${time.getDate() +
        "-" +
        time.getMonth() +
        "-" +
        time.getFullYear()}`);
    }
  });
}

function writeLogs() {
  const date = new Date();
  fs.writeFile(path.join(__dirname,'log', `l`))
}

http
  .createServer(function (req, res) {
    const { pathname } = url.parse(req.url);
    const file = pathname === "/" ? "index.html" : pathname;
    const ext = file.split(".").pop();

    res.writeHead(200, { "Content-Type": `text/${ext}` });

    const fileToRead = path.join(__dirname, "static", file);
    returnFile(fileToRead, res, function (err) {
      returnFile(
        path.join(__dirname, "static/error.html"),
        res,
        function (err) {
          res.end("There was an error");
        }
      );
    });
  })
  .listen(8000);
console.log(`Listening on port 8000 at ${time.getHours() +
  ":" +
  time.getMinutes() +
  ":" +
  time.getSeconds()} on the ${time.getDate() +
  "-" +
  time.getMonth() +
  "-" +
  time.getFullYear()}`);
