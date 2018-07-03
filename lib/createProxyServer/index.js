const args = require("args");
const http = require("http");
const https = require("https");
const httpProxy = require("http-proxy");
const { inspect } = require("util");
const { URL } = require("url");
const fs = require('fs');

var proxy = httpProxy.createProxyServer(); // See (†)

args
  // .option('host', 'The host on which the server will be running', '127.0.0.1')
  .option("port", "The port on which the server will be running", 54321)
  .example("createProxyServer -p 8080", "Switch on upload and save files in directory /tmp");

let flags = args.parse(process.argv);

// http
//   .createServer(function(req, res) {
//     proxy.web(req, res, {
//       target: `http://119.28.77.31:12345`
//     });
//   })
//   .listen(flags.port);

httpProxy.createServer({
  target: 'http://119.28.77.31:12345'
}).listen(flags.port)


// let  cert = fs.readFileSync(`${__dirname}/LocalRootCA.crt`),
// key = fs.readFileSync(`${__dirname}/LocalRootCA.key`)

// let proxyOptions = {
//     ssl: {
//         cert,
//         key
//     },
//     secure: true
// }

// let httpsOptions = {
//     cert,
//     key
// }

// let proxyHttps = httpProxy.createProxyServer(proxyOptions);

// https.createServer(httpsOptions, (req, res) => {
//   let host = req.headers.host;
//   console.log(host);
//   proxyHttps.web(req, res, {
//     target: `https://${host}`,
//     secure: false
//   });
// }).listen(flags.port, () => {
//     console.log(`${flags.port}端口启动成功！`)
// })