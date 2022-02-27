const http = require("http");
var url = require("url");
var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "online_library_management",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };

  console.log("Hello server");

  var reqUrlString = req.url;
  var urlParse = url.parse(reqUrlString, true, false);
  //   console.log(urlParse);
  if (urlParse.pathname === "/register/") {
    var query = urlParse.query;
    let name = query.name,
      creatorName = query.creatorName,
      channelName = query.channelName,
      uploadedBy = query.uploadedBy,
      phone = query.phone,
      duration = query.duration,
      description = query.description;
    console.log(
      name,
      creatorName,
      channelName,
      uploadedBy,
      phone,
      duration,
      description
    );
    con.query(
      "INSERT INTO `video_info` (`name`, `creator_name`, `channel_name`, `uploaded_by`, `phone`, `duration`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        creatorName,
        channelName,
        uploadedBy,
        phone.toString(),
        parseFloat(duration),
        description,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
          res.writeHead(400, headers);
          res.end("error");
        } else {
          res.writeHead(200, headers);
          res.end("Success");
        }
      }
    );
  }
});

server.listen(8000);
console.log("listening on 8000");
