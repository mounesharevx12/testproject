var http = require('http');
var mysql = require('mysql');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var express = require('express');
var auth = require('basic-auth');
var compare = require('tsscmp');
var app = express();
const bodyParser = require("body-parser");
// const express = require('express');
// const app = new express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'creative_prod'
});
// console.log(app.get());

app.get('/advertiser',function(req,res,next){
    connection.query('SELECT * from advertiser ', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/dimension',function(req,res,next){
    connection.query('SELECT * from dimension ', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/global',function(req,res,next){
    connection.query('SELECT * from global where category="global"', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/overlay',function(req,res,next){
    connection.query('SELECT * from global where category="overlay"', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/multislot',function(req,res,next){
    connection.query('SELECT * from multislot', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/sample',function(req,res,next){
    connection.query('SELECT * from multisampl', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/multislot',function(req,res,next){
    connection.query('SELECT * from multislot', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/staticcreative',function(req,res,next){
    connection.query('SELECT * from staticcreative', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/staticdimen',function(req,res,next){
    connection.query('SELECT * from staticdim', function(err, rows, fields)
        {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows));
        }); 
});
app.get('/',function(req,res,next){
    var credentials = auth(req)
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else{
    // res.end('Access granted')
  res.sendfile('root.html');
  }
});
app.get('/cpreview',function(req,res,next){
  res.sendfile('index.html');
});
app.get('/multiview',function(req,res,next){
  res.sendfile('multi.html');
});
app.get('/static',function(req,res,next){
  res.sendfile('staticcreative.html');
});
app.get('/admin',function(req,res,next){
      var credentials = auth(req)
  if (!credentials || !admincheck(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else{
    // res.end('Access granted')
  res.sendfile('admin/main.html');
  }

});
app.get('/advertiserupdate',function(req,res,next){
  res.sendfile('admin/form.html');
});
app.get('/multislotupdate',function(req,res,next){
  res.sendfile('admin/multi.html');
});
app.get('/dimupdate',function(req,res,next){
  res.sendfile('admin/dimension.html');
});
app.get('/globpdate',function(req,res,next){
  res.sendfile('admin/global.html');
});
app.get('/advertiserinsert',function(req,res,next){
  res.sendfile('admin/adveradd.html');
});
app.get('/multidesigninsert',function(req,res,next){
  res.sendfile('admin/multidesign.html');
});
app.get('/staticdataupdate',function(req,res,next){
  res.sendfile('admin/staticcreative.html');
});
app.post('/dbappend',function(req,res,next){
  console.log(req.body);
      connection.query("update advertiser set CSS='"+escape(req.body.CSS)+"',AddJS='"+escape(req.body.AddJS)+"',Androidstore='"+escape(req.body.Androidstore)+"',Fallback='"+escape(req.body.Fallback)+"',Fontlink='"+escape(req.body.Fontlink)+"',JS='"+escape(req.body.JS)+"',Sample_Data='"+escape(req.body.Sample_Data)+"',Single_Sample_Data='"+escape(req.body.Single_Sample_Data)+"',iosstore='"+escape(req.body.iosstore)+"',AddJS='"+escape(req.body.AddJS)+"' where AdID="+req.body.id+"", function(err, rows, fields)
        {
           if (err) { throw err; }else{
                console.log('1 row affected');
                res.redirect('/admin');
           }

        }); 
});
app.post('/multiupdate',function(req,res,next){
  console.log(req.body);
      connection.query("update multislot set CSS='"+escape(req.body.CSS)+"',JS='"+escape(req.body.JS)+"',Dimension='"+req.body.Dimension+"',macros='"+req.body.macros+"',AdJS='"+escape(req.body.AdJS)+"',slots='"+req.body.slots+"',HTML='"+escape(req.body.HTML)+"' where layout='"+req.body.layout+"'", function(err, rows, fields)
        {
           if (err) { throw err; }else{
                console.log('1 row affected');
                res.redirect('/admin');
           }

        }); 
});
app.post('/dimensionupdate',function(req,res,next){
  console.log(req.body);
      connection.query("update dimension set CSS='"+escape(req.body.CSS)+"',JS='"+escape(req.body.JS)+"',AdJS='"+escape(req.body.AdJS)+"',HTML='"+escape(req.body.HTML)+"' where Dimension='"+req.body.Dimension+"'", function(err, rows, fields)
        {
           if (err) { throw err; }else{
                console.log('1 row affected');
                res.redirect('/admin');
           }

        }); 
});
app.post('/globalupdate',function(req,res,next){
  console.log(req.body);
      connection.query("update global set CSS='"+escape(req.body.CSS)+"',JS='"+escape(req.body.JS)+"',HTML='"+escape(req.body.HTML)+"' where category='global'", function(err, rows, fields)
        {
           if (err) { throw err; }else{
                console.log('1 row affected');
                res.redirect('/admin');
           }

        }); 
});
app.post('/adveraddDB',function(req,res,next){
  console.log(req.body);
      connection.query("INSERT INTO advertiser(AdID, Advertiser, CSS, JS, AddJS, Fallback, Fontlink, Androidstore, iosstore, MMPAndr, MMPIOS, Sample_Data, Single_Sample_Data) VALUES ('"+req.body.AdID+"','"+req.body.Advertiser+"','"+escape(req.body.CSS)+"','"+escape(req.body.JS)+"','"+escape(req.body.AddJS)+"','"+escape(req.body.Fallback)+"','"+escape(req.body.Fontlink)+"','"+escape(req.body.Androidstore)+"','"+escape(req.body.iosstore)+"','"+escape(req.body.MMPAndr)+"','"+escape(req.body.MMPIOS)+"','"+escape(req.body.Sample_Data)+"','"+escape(req.body.Single_Sample_Data)+"')", function(err, rows, fields)
        {
           if (err) { throw err; }else{
                console.log('1 row inserted');
                res.redirect('/admin');
           }

        }); 
});
app.post('/multiaddDB',function(req,res,next){
  console.log(req.body);
      connection.query("INSERT INTO multislot(CSS, JS, HTML, Dimension, AdJS, layout, slots, macros) VALUES ('"+escape(req.body.CSS)+"','"+escape(req.body.JS)+"','"+escape(req.body.HTML)+"','"+req.body.Dimension+"','"+escape(req.body.AdJS)+"','"+req.body.layout+"','"+req.body.slots+"','"+req.body.macros+"')", function(err, rows, readFileds)
        {
           if (err) { throw err; }else{
                console.log('1 row inserted');
                res.redirect('/admin');
           }

        }); 
});
app.post('/staticupdate',function(req,res,next){
  console.log(req.body);
      connection.query("update staticcreative set CSS='"+escape(req.body.CSS)+"',JS='"+escape(req.body.JS)+"',HTML='"+escape(req.body.HTML)+"'", function(err, rows, fields)
        {
           if (err) { throw err; }else{
                console.log('1 row affected');
                res.redirect('/admin');
           }

        }); 
});


app.listen(8084);
// console.log('MySQL Connection details  '+connection);
//     app.get('/append',function(req,res,next){
// res.sendfile('form.html');
// });
//     app.post('/dbappend', function(req, res) {
//       console.log(req);
//         // connection.query('INSERT INTO `advertiser`(`AdID`, `Advertiser`, `CSS`, `JS`, `AddJS`, `Fallback`, `Fontlink`, `Androidstore`, `iosstore`, `MMPAndr`, `MMPIOS`, `Sample_Data`, `Single_Sample_Data`) VALUES ('7405','','','','','','','','','','','','');', function(err, rows, fields)
//         // {
//         //     console.log('1 row affected');
//         // });

//     });
// app.get('/multislot',function(req,res,next){
//       connection.query('SELECT * from dimension', function(err, rows, fields)
//         {
//                 rows.writeHead(200, { 'Content-Type': 'application/json'});
//                 rows.end(JSON.stringify(rows));
//         }); 
// });    
// app.listen(8085);

// http.createServer(function (request, response) 
// { 
//   var credentials = auth(request)
//   if (!credentials || !check(credentials.name, credentials.pass)) {
//     response.statusCode = 401
//     response.setHeader('WWW-Authenticate', 'Basic realm="example"')
//     response.end('Access denied')
//   } else{

// 		if((request.url).indexOf("advertiser")>-1){
// 			        connection.query('SELECT * from advertiser ', function(err, rows, fields)
//         {
//                 response.writeHead(200, { 'Content-Type': 'application/json'});
//                 response.end(JSON.stringify(rows));
//         }); 
// 		}else if((request.url).indexOf("dimension")>-1){
// 			connection.query('SELECT * from dimension', function(err, rows, fields)
//         {
//                 response.writeHead(200, { 'Content-Type': 'application/json'});
//                 response.end(JSON.stringify(rows));
//         }); 
// 		}else if((request.url).indexOf("global")>-1){
//       connection.query('SELECT * from global where category="global"', function(err, rows, fields)
//         {
//                 response.writeHead(200, { 'Content-Type': 'application/json'});
//                 response.end(JSON.stringify(rows));
//         }); 
//     }else if((request.url).indexOf("overlay")>-1){
// 			connection.query('SELECT * from global where category="overlay"', function(err, rows, fields)
//         {
//                 response.writeHead(200, { 'Content-Type': 'application/json'});
//                 response.end(JSON.stringify(rows));
//         }); 
// 		}

//     else if((request.url).indexOf("multislot")>-1){
//             connection.query('SELECT * from multislot', function(err, rows, fields)
//         {
//                 response.writeHead(200, { 'Content-Type': 'application/json'});
//                 response.end(JSON.stringify(rows));
//         });
//     }
//     else if((request.url).indexOf("sample")>-1){
//             connection.query('SELECT * from multisampl', function(err, rows, fields)
//         {
//                 response.writeHead(200, { 'Content-Type': 'application/json'});
//                 response.end(JSON.stringify(rows));
//         });
//     }  
//     if (request.url === "/cpreview") {
//         fs.readFile("index.html", function (error, pgResp) {
//             if (error) {
//                 response.writeHead(404);
//                 response.write('Contents you are looking are Not Found');
//             } else {
//                 response.writeHead(200, { 'Content-Type': 'text/html' });
//                 response.write(pgResp);
//             }
             
//             response.end();
//         });
//     }    if (request.url === "/") {
//         fs.readFile("root.html", function (error, pgResp) {
//             if (error) {
//                 response.writeHead(404);
//                 response.write('Contents you are looking are Not Found');
//             } else {
//                 response.writeHead(200, { 'Content-Type': 'text/html' });
//                 response.write(pgResp);
//             }
             
//             response.end();
//         });
//     }    if (request.url === "/multiview") {
//         fs.readFile("multi.html", function (error, pgResp) {
//             if (error) {
//                 response.writeHead(404);
//                 response.write('Contents you are looking are Not Found');
//             } else {
//                 response.writeHead(200, { 'Content-Type': 'text/html' });
//                 response.write(pgResp);
//             }
             
//             response.end();
//         });
//     }  
// app.get('/main', function(request, response){
//     response.sendfile('main.html');
// });

// console.log('started at http://192.168.153.25:8084/cpreview');
// }
// }).listen(8084);
function check (name, pass) {
  var valid = true
  valid = compare(name, 'admin.dashboard@revx.io') && valid
  valid = compare(pass, 'RevXOnAVoyage2019') && valid
  return valid
}
function admincheck (name, pass) {
  var valid = true
  valid = compare(name, 'admin.dashboard@revx.io') && valid
  valid = compare(pass, 'RevXOnAVoyage2019') && valid
  return valid
}
// function admincheck (name, pass) {
//   var valid = true
//   valid = compare(name, 'CDA') && valid
//   valid = compare(pass, 'moni@123') && valid
//   return valid
// }
