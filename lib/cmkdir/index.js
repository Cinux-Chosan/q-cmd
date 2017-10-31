const fs = require('fs');
const path = require('path');
const args = require('args')

args
  .option('dir', 'The dir')

let flags = args.parse(process.argv)

function testFile(dir, options = {}) {
  if (fs.existsSync(dir || flags.dir)) {
    return true
  } else {
    testFile(path.normalize(dir + '..'), options);
  }
}
