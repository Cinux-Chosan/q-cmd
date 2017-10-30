const formidable = require('formidable');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const { stringify } = JSON;

exports = module.exports = function() {
  return (req, res) => {

    function get_upload() {
      createReadStream('./upload.html').pipe(res);
    }

    function post_upload(dir = './upload') {
      let form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        let { fileupload: up } = files;
        createReadStream(up.path)
          .pipe(createWriteStream(path.join(dir, up.name)))
          .on('error', e => res.end(stringify(e)));
        res.redirect('/upload');
      })
    }

    return eval(`${req.method.toLowerCase()}_${req.url.substr(1).toLowerCase()}`)(...arguments);
  }
}
