var fileupload = document.getElementById('fileupload');
var uploadList = document.getElementById('upload_list');

fileupload.addEventListener('change', function() {
  var files = fileupload.files;
  var items = '';

  for(var i = 0, len = files.length; i < len; ++i) {
    items += ('<li>' + files[i].name + '</li>');
  }

  uploadList.innerHTML = items;
})
