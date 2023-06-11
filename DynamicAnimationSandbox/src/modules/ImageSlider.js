class ImageSlider {
  #DOMcache = {
    bodyElement: document.body,
  };
  #DOMtemplates = {
    sliderContainer: `
      <div class="Image-Slider-Container"></div>
    `,
    sliderDisplay: `
      <div class="Image-Slider-Display">
        <div class="Image-Slider-Image Image-1"></div>
        <div class="Image-Slider-Image Image-2"></div>
        <div class="Image-Slider-Image Image-3"></div>
      </div>
    `,
    sliderButtons: `
      <div class="Image-Slider-Buttons">
        <button class="Image-Slider-Button Left"></button>
        <button class="Image-Slider-Button Reset"></button>
        <button class="Image-Slider-Button Right"></button>
      </div>
    `,
  };

  #DOMSliderImageClasses = ["Image-1", "Image-2", "Image-3"];

  #arrCurrentKeySIC = 0;
  #userClickedSliderButton = false;
  #autoTransitionInterval = null;

  #initSliderAutoTransition() {
    if (!this.#autoTransitionInterval) {
      this.#autoTransitionInterval = setInterval(() => {
        this.#moveSliderRight();
      }, 2000);
    }
  }

  #moveSliderRight() {

  }
  #moveSliderLeft() {

  }
  #resetSliderPosition() {

  }

  #sliderButtonLogic(event) {}

  #removeAllEventListeners() {}

  #addAllEventListeners() {}

  initializeEventListeners(sliderFrag) {}

  #buildSlider() {}

  #appendSlider(parentElement) {}

  init(parentElement) {
    if (parentElement) {
      const sliderFrag = this.#buildSlider();

      this.initializeEventListeners(sliderFrag);
      parentElement.append(sliderFrag);
    }
  }
}
