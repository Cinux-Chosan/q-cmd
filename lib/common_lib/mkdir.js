const { existsSync, mkdirSync } = require('fs');
const { join, normalize, relative } = require('path');

module.exports = function(dirname = './', options = {}) {
  let { cwd = process.cwd() } = options;
  let rel = normalize(relative(cwd, dirname));
  paths = rel.split(/[\/\\\\]/);
  paths.reduce((base, el) => {
    let path = join(base, el);
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    return path;
  }, process.cwd());
  return dirname;
}
