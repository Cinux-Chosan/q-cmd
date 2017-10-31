const { existsSync, mkdirSync } = require('fs');
const { join, normalize, relative, resolve } = require('path');

module.exports = function(dirname = './', options = {}) {
  let { cwd = process.cwd() } = options;
  let rel = normalize(relative(cwd, resolve(cwd, dirname)));
  let paths = rel.split(/[\/\\\\]/);
  paths.reduce((base, el) => {
    let path = join(base, el);
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    return path;
  }, cwd);
  return dirname;
}
