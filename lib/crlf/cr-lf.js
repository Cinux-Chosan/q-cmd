const fileProcessor = require('../common_lib/file-processor');
const { mkArray } = require('../common_lib/utils');

let exts = ['js', 'css', 'hbs', 'txt', 'html', 'json', 'php'];
let excepts = ['gif', 'dpk', 'dmg', 'jpg', 'png', 'exe', 'pdf', 'ppt', 'doc'];
let exceptDirs = ['node_modules', '.git', 'dist', 'tmp'];

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
    let adds = mkArray(addMatch);
    exts.push(...adds);
  }

  if (addUnmatch) {
    let unmatch = mkArray(addUnmatch);
    excepts.push(...unmatch)
  }

  if (deleteMatch) {
    let del = mkArray(deleteMatch);
    exts = exts.filter(el => !del.includes(el));
  }

  if (deleteUnmatch) {
    let del = mkArray(deleteUnmatch);
    excepts = excepts.filter(el => !excepts.includes(el));
  }

  if (unmatchDir) {
    let unmatch = mkArray(unmatchDir);
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
