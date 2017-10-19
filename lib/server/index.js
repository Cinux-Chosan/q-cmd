const express = require('express')
const serveIndex = require('serve-index')
const compression = require('compression');
const args = require('args')
const ip = require('ip');

let app = express()

args
  .option('port', 'The port on which the server will be running', 8000)
  .option('download', 'Serve up all files for download')
  .option('cwd', 'Path of work directory', process.cwd())
  .example('server', 'Run the server on port 8000(default)')
  .example('server -p 9000', 'Change the port to 9000 which the server running on')
  .example('server -d', 'Serve up all files for download')

let flags = args.parse(process.argv)

app
  .use(compression())
  .use(express.static(flags.cwd, { index: flags.download ? !!flags.download : undefined }))
  .use(serveIndex(flags.cwd, { icons: true }))
  .listen(flags.port, () => {
    console.log(`\n\t please visit ${ip.address()}:${flags.port}`)
  })
