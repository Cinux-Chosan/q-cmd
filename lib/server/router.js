const formidable = require('formidable')
const { join } = require('path')
const cmkdir = require('../common_lib/mkdir')
const { createReadStream, createWriteStream, readFile } = require('fs')
const { stringify } = JSON

exports = module.exports = function() {
  return (req, res) => {

    function get_upload() {
      readAssets('upload.js', (err, js) => {
        if (err) return res.end(stringify(err))
        readAssets('upload.css', (err, style) => {
          if (err) return res.end(stringify(err))
          readAssets('upload.html',(err, html) => {
            if (err) return res.end(stringify(err))
            html = html.replace(/\{%style%\}/, style).replace(/\{%script%\}/, js)
            res.set('Content-Type', 'text/html')
            res.end(html)
          })
        })
      })
      // createReadStream(join(__dirname, './assets/upload.html')).pipe(res)
    }

    function post_upload(dir = './upload') {
      let form = new formidable.IncomingForm()
      form.multiples = true
      form.parse(req, (err, fields, files) => {
        let { fileupload: up } = files
        up.forEach(file => {
          createReadStream(file.path)
            .pipe(createWriteStream(join(cmkdir(dir), file.name)))
            .on('error', e => res.end(stringify(e)))
        })
        res.redirect('/upload')
      })
    }
    return eval(`${req.method.toLowerCase()}_${req.path.substr(1).toLowerCase()}`)(...arguments)
  }
}

function readAssets(path, cb) {
  readFile(join(__dirname, 'assets', path), { encoding: 'utf8' }, cb)
}
