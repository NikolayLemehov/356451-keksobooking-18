'use strict';

(function () {
  window.createSlider = function (moveMouse) {
    var slider = document.createElement('div');
    slider.innerHTML = '<input type="range" name="slider1"><input type="range" name="slider2">';

    var inputX = slider.querySelector('input[name="slider1"]');
    inputX.style.display = 'none';
    var inputY = slider.querySelector('input[name="slider2"]');
    inputY.style.display = 'none';

    moveMouse(inputX, inputY);
    return slider;
  };
})();
