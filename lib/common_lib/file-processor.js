const vf = require('vinyl-fs');
const map = require('map-stream');

module.exports = function(glob, opts, processor, dest = './') {
  vf.src(glob, opts)
    .pipe(map(processor))
    .pipe(vf.dest(dest))
}
