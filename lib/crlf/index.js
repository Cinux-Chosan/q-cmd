const args = require('args');
const crlf = require('./cr-lf');


args
  .option('lf', 'Switch on lf', true)
  .option('crlf', 'Switch on crlf')
  .option(['e', 'all'], 'Match all files')
  .option(['E', 'empty'], 'Ignore all matchs')
  .option(['a', 'add-match'], 'Add matches')
  .option(['A', 'add-unmatch'], 'Add excepts')
  .option(['d', 'delete-match'], 'Delete matches')
  .option(['D', 'delete-unmatch'], 'Delete un-matches')
  .option(['N', 'unmatch-dir'], 'Wo\'nt match files in this directory')
  .option('wd', 'Work directory')

let flags = args.parse(process.argv);

console.log(flags);

console.log(args.sub);

crlf(flags);
