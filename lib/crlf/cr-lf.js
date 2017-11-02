const fileProcessor = require('../common_lib/file-processor');

const { isArray } = Array;

let exts = ['js', 'css', 'hbs', 'txt', 'html', 'json'];

let excepts = ['gif', 'dpk', 'dmg', 'jpg'];

let exceptDirs = ['node_modules', '.git'];

module.exports = function(opts = {}) {

  let { addMatch, addUnmatch, deleteMatch, deleteUnmatch, unmatchDir } = opts;

  if (opts.wd) {
    process.chdir(opts.wd);
  }

  if (opts.empty) {
    exts = [];
    excepts = [];
  }

  if (addMatch) {
    let adds = isArray(addMatch) ? addMatch : [ addMatch ];
    exts.push(...adds);
    console.log(exts);

  }

  if (addUnmatch) {
    let unmatch = isArray(addUnmatch) ? addUnmatch : [ addUnmatch ];
    excepts.push(...unmatch)
  }

  if (deleteMatch) {
    let del = isArray(deleteMatch) ? deleteMatch : [ deleteMatch ];
    exts = exts.filter(el => !del.includes(el));
  }

  if (deleteUnmatch) {
    let del = isArray(deleteUnmatch) ? deleteUnmatch : [ deleteUnmatch ];
    excepts = excepts.filter(el => !excepts.includes(el));
  }

  if (unmatchDir) {
    let unmatch = isArray(unmatchDir) ? unmatchDir : [ unmatchDir ];
    exceptDirs.push(...unmatch)
  }

  let glob_exts = `**/*.{${exts.join(',')}}`;
  let glob_excepts = `!**/*.{${excepts.join(',')}}`;
  let glob_exceptDirs = `!**/(${exceptDirs.join('|')})/**`;
  let glob = [glob_exts, glob_excepts, glob_exceptDirs];

  if (opts.all) {
    glob = ['**/*'];
  }

  fileProcessor(glob, { nodir: true, dot: true }, processor.bind(null, opts));
}

function processor (opts, file, cb) {
  let contents = '' + file.contents;
  if (opts.crlf) {
    contents = contents.replace(/([^\n])?\n/g, (match, sub) => (!sub || sub === '\r') ? '\r\n' : (sub + '\r\n'));
    // contents = contents.replace(/([^\n]+?)?\n/g, '$1\r\n');
  } else {
    contents = contents.replace(/\r\n/g, '\n');
  }
  file.contents = Buffer.from(contents);
  cb(null, file)
}
