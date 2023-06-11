class ImageSlider {
  #DOMcache = {
    bodyElement: document.body,
  };
  #DOMtemplates = {
    sliderContainer: `
      <div class="Image-Slider-Container ${this.#uniqueIdentifier}"></div>
    `,
    sliderDisplay: `
      <div class="Image-Slider-Display ${this.#uniqueIdentifier}"></div>
    `,
    sliderImage: `
    <div class="Image-Slider-Image ${this.#uniqueIdentifier}"></div>
    `,
    sliderButtons: `
      <div class="Image-Slider-Buttons ${this.#uniqueIdentifier}">
        <button class="Image-Slider-Button ${
          this.#uniqueIdentifier
        } Left"></button>
        <button class="Image-Slider-Button ${
          this.#uniqueIdentifier
        } Reset"></button>
        <button class="Image-Slider-Button ${
          this.#uniqueIdentifier
        } Right"></button>
      </div>
    `,
  };

  #DOMSliderImageClasses = ["Image-1", "Image-2", "Image-3"];
  #arrCurrentKeySIC = 0;

  #userClickedSliderButton = false;
  #autoTransitionInterval = null;

  #uniqueIdentifier = "";
  #uniqueIdentifierCache = [];

  #initSliderAutoTransition() {
    if (!this.#autoTransitionInterval) {
      this.#autoTransitionInterval = setInterval(() => {
        this.#moveSliderRight();
      }, 2000);
    }
  }

  #moveSliderRight() {}
  #moveSliderLeft() {}
  #resetSliderPosition() {}

  #sliderButtonLogic(event) {}

  #removeAllEventListeners(assembledSlider) {}

  #addAllEventListeners(assembledSlider) {}

  initializeEventListeners(assembledSlider) {
    this.#removeAllEventListeners(assembledSlider);
    this.#addAllEventListeners(assembledSlider);
  }

  #buildCompleteSlider() {
    const sliderContainer = this.#buildContainer(),
      sliderDisplay = this.#buildDisplay(),
      sliderButtons = this.#buildButtons();

    let assembledSlider = sliderContainer;
    assembledSlider.appendChild(sliderDisplay);
    assembledSlider.appendChild(sliderButtons);

    return assembledSlider;
  }

  #buildContainer() {
    const SCrange = document.createRange(),
      sliderContainerFrag = SCrange.createContextualFragment(
        this.#DOMtemplates.sliderContainer
      );
    this.#DOMcache.sliderContainerElement = sliderContainerFrag.querySelector(
      ".Image-Slider-Container"
    );
    return sliderContainerFrag;
  }
  #buildDisplay() {
    const SDrange = document.createRange(),
      sliderDisplayFrag = SDrange.createContextualFragment(
        this.#DOMtemplates.sliderDisplay
      );

    this.#DOMcache.sliderDisplayContainerElement =
      sliderDisplayFrag.querySelector(".Image-Slider-Display");

    return sliderDisplayFrag;
  }

  #buildButtons() {
    const SBrange = document.createRange(),
      sliderButtonsFrag = SBrange.createContextualFragment(
        this.#DOMtemplates.sliderButtons
      );
    this.#DOMcache.sliderButtonsContainerElement =
      sliderButtonsFrag.querySelector(".Image-Slider-Buttons");
    return sliderButtonsFrag;
  }

  #buildImage() {
    const SIrange = document.createRange(),
      sliderImage = SIrange.createContextualFragment(
        this.#DOMtemplates.sliderImage
      );
    return sliderImage;
  }

  #appendSlider(parentElement, assembledSlider) {
    parentElement.appendChild(assembledSlider);
  }

  #mapImageIdentifiers(imageSet) {

    imageSet.forEach((imageElement, index = 0) => {
      const imageIdentifier = `Image-${index + 1}`;
      imageElement.classList.add(imageIdentifier);
      this.#DOMcache[imageIdentifier] = imageElement;
      this.#DOMSliderImageClasses.push(imageIdentifier);
    });
    
  }

  #addImageElements(numOfImages) {
    const createdImageElements = [];

    if (numOfImages > 1) {
      const { sliderDisplayContainerElement } = this.#DOMcache;
      sliderDisplayContainerElement.innerHTML = "";

      for (let i = 0; i < numOfImages; i++) {
        const imageElement = this.#buildImage();
        createdImageElements.push(imageElement);
        sliderDisplayContainerElement.appendChild(imageElement);
      }
    }

    if (createdImageElements.length > 0) {
      this.#mapImageIdentifiers(createdImageElements);
    }
  }

  init(parentElement, uniqueIdentifier, numOfImages = 2) {
    if (
      parentElement &&
      uniqueIdentifier !== null &&
      !this.#uniqueIdentifierCache.includes(uniqueIdentifier)
    ) {
      this.#uniqueIdentifier = uniqueIdentifier;

      const assembledSlider = this.#buildCompleteSlider();
      this.initializeEventListeners(assembledSlider);

      this.#addImageElements(numOfImages);

      this.#appendSlider(parentElement, assembledSlider);
    }
  }
}
