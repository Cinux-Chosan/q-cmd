const formidable = require('formidable')
const { join } = require('path')
const cmkdir = require('../common_lib/mkdir')
const { createReadStream, createWriteStream } = require('fs')
const { stringify } = JSON

exports = module.exports = function() {
  return (req, res) => {

    function get_upload() {
      createReadStream(join(__dirname, './upload.html')).pipe(res)
    }

    function post_upload(dir = './upload') {
      let form = new formidable.IncomingForm()
      form.parse(req, (err, fields, files) => {
        let { fileupload: up } = files
        createReadStream(up.path)
          .pipe(createWriteStream(join(cmkdir(dir), up.name)))
          .on('error', e => res.end(stringify(e)))
        res.redirect('/upload')
      })
    }

    return eval(`${req.method.toLowerCase()}_${req.url.substr(1).toLowerCase()}`)(...arguments)
  }
}
