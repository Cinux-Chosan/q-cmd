const fileProcessor = require('../common_lib/file-processor');

const { isArray } = Array;

let exts = ['js', 'css', 'hbs', 'txt', 'html', 'json'];

let excepts = ['gif', 'dpk', 'dmg', 'jpg'];

let exceptDirs = ['node_modules', '.git'];

module.exports = function(opts = {}) {

  let addMatch = opts['add-match'],
      addUnmatch = opts['add-unmatch'],
      delMatch = opts['delete-match'],
      delUnmatch = opts['delete-unmatch'],
      unmatchDir = opts['unmatch-dir'];

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
  }

  if (addUnmatch) {
    let unmatch = isArray(addUnmatch) ? addUnmatch : [ addUnmatch ];
    excepts.push(...unmatch)
  }

  if (delMatch) {
    let del = isArray(delMatch) ? delMatch : [ delMatch ];
    exts = exts.filter(el => !del.includes(el));
  }

  if (delUnmatch) {
    let del = isArray(delUnmatch) ? delUnmatch : [ delUnmatch ];
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

  fileProcessor(glob, processor.bind(null, opts));
}

function processor (opts, file, cb) {
  let content = '' + file.contents;
  if (opts.crlf) {
    content = content.replace(/([^\r]+?)?\n/g, '$1\r\n');
  } else {
    content = content.replace(/\r\n/g, '\n');
  }
  file.contents = Buffer.from(content);
  cb(null, file)
}
