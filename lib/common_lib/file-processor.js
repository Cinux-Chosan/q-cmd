const vf = require('vinyl-fs');
const map = require('map-stream');

module.exports = function(glob, processor, dest = './') {
  vf.src(glob)
    .pipe(map(processor))
    .pipe(vf.dest(dest))
}
