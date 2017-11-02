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
  .example('lf', 'Convert all file line endings to lf')
  .example('lf -c', 'Convert all file line endings to crlf')
  .example('lf -a php', 'Add all php files for matching')
  .example('lf -d php', 'Won\'t match php files')
  .example('lf -N node_modules', 'Won\'t match files in node_modules recursively')

let flags = args.parse(process.argv);

crlf(flags);
