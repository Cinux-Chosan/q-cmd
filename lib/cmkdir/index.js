const args = require('args')
const mkdir = require('../common_lib/mkdir');

args.parse(process.argv);

mkdir(args.sub[0]);
