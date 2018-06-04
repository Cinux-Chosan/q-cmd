// 在控制台快速打开指定文件或者 url

const args = require('args')
const open = require('open')

args
  .option('path', 'the file path or the url')
  .option('application', 'specify the program')
  .example('copen https://chosan.cn', 'open the url with the default browser')

let flags = args.parse(process.argv)
open(flags.path || process.argv[1], flags.application)
