const express = require('express')
const serveIndex = require('serve-index')
const compression = require('compression')
const args = require('args')
const { address } = require('ip')
const fs = require('fs')
const myRouter = require('./router')
const { join } = require('path')

let app = express()

args
  .option('port', 'The port on which the server will be running', 8888)
  .option('download', 'Serve up all files for download, otherwise index.html will be serve up as root')
  .option('cwd', 'Path of work directory', process.cwd())
  .option('upload', 'Accept upload files')
  .option('updir', 'The directory to save uplaod files, if not specified, an upload directory will be created')
  .example('server', 'Run the server on port 8888(default)')
  .example('server -p 9000', 'Change the port to 9000 which the server will be running on')
  .example('server -d', 'Serve up all files for download')
  .example('server -u', 'Switch on upload')
  .example('server -U /tmp', 'Switch on upload and save files in directory /tmp')

let flags = args.parse(process.argv)

if (flags.upload || flags.updir) {
  app
    .get('/upload', myRouter())
    .post('/upload', myRouter(flags.updir || join(process.cwd(), 'upload')))
}

app
  .use(compression())
  .use(express.static(flags.cwd, { index: flags.download ? !flags.download : undefined }))
  .use(serveIndex(flags.cwd, { icons: true }))
  .listen(flags.port, () => {
    console.log(`\n\t please visit http://${address()}:${flags.port}`)
  })
