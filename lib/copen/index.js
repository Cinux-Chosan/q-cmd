// 在控制台快速打开指定文件或者 url

const args = require('args')
const open = require('opn')
const { inspect } = require('util')

args
  .option('path', 'the file path or the url')
  .option('application', 'specify the program')
  .example('copen https://chosan.cn', 'open the url with the default browser')
let { argv, argv0 } = process
let flags = args.parse(argv)
let params = []
if (argv0 == 'node') {
  params = [flags.path || argv[2], {
    app: flags.application || argv[3],
    wait: false
  }]
} else {
  params = [flags.path || argv[1], {
    app: flags.application || argv[2],
    wait: false
  }]
}
open(...params).then(res => console.log(`打开文件 ${params[0]} 成功!`), err => console.log(err))