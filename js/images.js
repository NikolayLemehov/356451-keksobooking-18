'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var addImages = function (file, cb) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        cb(reader);
      });
      reader.readAsDataURL(file);
    }
  };
  var addAvatarSrc = function (reader) {
    adFormHeaderPreviewImg.src = reader.result;
  };
  var addHousingPhoto = function (reader) {
    adFormPhotoUploadElement.after(renderPreview(reader.result));
  };

  var fileChooserAvatarInput = document.querySelector('#avatar');
  var adFormHeaderPreviewImg = document.querySelector('.ad-form-header__preview img');
  var avatarSrcDefault = adFormHeaderPreviewImg.src;
  fileChooserAvatarInput.addEventListener('change', function () {
    var file = fileChooserAvatarInput.files[0];
    addImages(file, addAvatarSrc);
  });

  var adFormPhotoUploadElement = document.querySelector('.ad-form__upload');
  var fileChooserImagesInput = document.querySelector('#images');
  var adFormPhotoElement = document.querySelector('.ad-form__photo');
  var renderPreview = function (src) {
    var element = adFormPhotoElement.cloneNode(true);
    element.style.backgroundImage = 'url(' + src + ')';
    element.style.backgroundSize = 'contain';
    element.style.backgroundPosition = '50% 50%';
    element.style.backgroundRepeat = 'no-repeat';
    return element;
  };
  fileChooserImagesInput.addEventListener('change', function () {
    var files = Array.from(fileChooserImagesInput.files);
    files.forEach(function (file) {
      addImages(file, addHousingPhoto);
    });
  });

  window.images = {
    deactivate: function () {
      var collection = document.querySelectorAll('.ad-form__photo-container .ad-form__photo:not(:last-of-type)');
      adFormHeaderPreviewImg.src = avatarSrcDefault;
      window.util.removeCollection(collection);
    },
  };
})();
