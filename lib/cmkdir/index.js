const args = require('args')
const mkdir = require('../common_lib/mkdir');

args
  .option('cwd', 'Current work directory')

let flags = args.parse(process.argv);

mkdir(args.sub[0], flags);
