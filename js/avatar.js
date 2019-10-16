'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adFormPhotoUploadElement = document.querySelector('.ad-form__upload');
  var fileChooser = document.querySelector('#images');
  var adFormPhoto = document.querySelector('.ad-form__photo');
  var renderPreview = function (src) {
    var element = document.createElement('img');
    element.setAttribute('width', '70');
    element.setAttribute('height', '70');
    element.src = src;
    return element;
  };
  var renderPreview2 = function (src) {
    var element = adFormPhoto.cloneNode(true);
    element.style.backgroundImage = 'url(' + src + ')';
    element.style.backgroundSize = 'contain';
    element.style.backgroundPosition = '50% 50%';
    element.style.backgroundRepeat = 'no-repeat';
    return element;
  };

  // var preview2 = document.querySelector('.ad-form-header__preview img');
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        // adFormPhoto.appendChild(renderPreview(reader.result));
        adFormPhotoUploadElement.after(renderPreview2(reader.result));
        // preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
