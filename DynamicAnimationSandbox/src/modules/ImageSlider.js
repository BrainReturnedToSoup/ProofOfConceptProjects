export class ImageSlider {
  constructor(uniqueIdentifier, numOfImages = 2, intervalTime = 1000) {
    if (numOfImages >= 2 && intervalTime >= 1000) {
      this.#stateData.uniqueIdentifier = uniqueIdentifier;
      this.#stateData.numOfImages = numOfImages;
      this.#stateData.intervalTime = intervalTime;
    }
  }
  #DOMcache = {};
  #DOMtemplates = {
    sliderContainer: `
      <div class="Image-Slider-Container"></div>
    `,
    sliderDisplay: `
      <div class="Image-Slider-Display"></div>
    `,
    sliderImage: `
    <div class="Image-Slider-Image"></div>
    `,
    sliderButtons: `
      <div class="Image-Slider-Buttons">
        <button class="Image-Slider-Button Left"></button>
        <button class="Image-Slider-Button Center"></button>
        <button class="Image-Slider-Button Right"></button>
      </div>
    `,
  };

  #stateData = {
    DOMSliderImageClasses: [],
    arrCurrentKeySIC: 0,
    autoTransitionInterval: null,
    intervalTime: 2000,
    numOfImages: 2,
    uniqueIdentifier: "",
    sliderButtonClicked: false,
  };

  #initSliderAutoTransition() {
    if (!this.#stateData.autoTransitionInterval) {
      this.#stateData.autoTransitionInterval = setInterval(() => {
        this.#moveSliderRight();
      }, this.#stateData.intervalTime);
    }
  }

  #moveSliderRight() {
    const currentSelectedImage =
      this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

    this.#stateData.arrCurrentKeySIC++;

    if (
      this.#stateData.arrCurrentKeySIC >
      this.#stateData.DOMSliderImageClasses.length - 1
    ) {
      this.#stateData.arrCurrentKeySIC = 0;
    }

    const nextSelectedImage =
      this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

    this.#DOMcache[currentSelectedImage].classList.remove("Selected");
    this.#DOMcache[nextSelectedImage].classList.add("Selected");
  }
  #moveSliderLeft() {
    const currentSelectedImage =
      this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

    this.#stateData.arrCurrentKeySIC--;

    if (this.#stateData.arrCurrentKeySIC < 0) {
      this.#stateData.arrCurrentKeySIC =
        this.#stateData.DOMSliderImageClasses.length - 1;
    }

    const nextSelectedImage =
      this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

    this.#DOMcache[currentSelectedImage].classList.remove("Selected");
    this.#DOMcache[nextSelectedImage].classList.add("Selected");
  }
  #resetSliderPosition() {
    if (this.#stateData.arrCurrentKeySIC > 0) {
      const currentSelectedImage =
        this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

      this.#stateData.arrCurrentKeySIC = 0;

      const defaultSelectedImage =
        this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

      this.#DOMcache[currentSelectedImage].classList.remove("Selected");
      this.#DOMcache[defaultSelectedImage].classList.add("Selected");
    } else if (this.#stateData.arrCurrentKeySIC === 0) {
      return;
    } else {
      const currentSelectedImage =
        this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

      this.#stateData.arrCurrentKeySIC = 0;

      const defaultSelectedImage =
        this.#stateData.DOMSliderImageClasses[this.#stateData.arrCurrentKeySIC];

      this.#DOMcache[currentSelectedImage].classList.remove("Selected");
      this.#DOMcache[defaultSelectedImage].classList.add("Selected");
    }
  }

  #sliderButtonLogic(event) {
    const {
      sliderButtonLeftElement,
      sliderButtonCenterElement,
      sliderButtonRightElement,
    } = this.#DOMcache;

    switch (event.target) {
      case sliderButtonLeftElement:
        if (!this.#stateData.sliderButtonClicked) {
          clearInterval(this.#stateData.autoTransitionInterval);
          this.#stateData.autoTransitionInterval = null;
          this.#stateData.sliderButtonClicked =
            !this.#stateData.sliderButtonClicked;
        }
        this.#moveSliderLeft();
        break;
      case sliderButtonRightElement:
        if (!this.#stateData.sliderButtonClicked) {
          clearInterval(this.#stateData.autoTransitionInterval);
          this.#stateData.autoTransitionInterval = null;
          this.#stateData.sliderButtonClicked =
            !this.#stateData.sliderButtonClicked;
        }
        this.#moveSliderRight();
        break;
      case sliderButtonCenterElement:
        this.#resetSliderPosition();
        clearInterval(this.#stateData.autoTransitionInterval);
        this.#stateData.autoTransitionInterval = null;
        this.#stateData.sliderButtonClicked =
          !this.#stateData.sliderButtonClicked;
        this.#initSliderAutoTransition();
        break;
      default:
        return;
    }
  }

  #removeAllEventListeners() {
    this.#DOMcache.sliderButtonsContainerElement.removeEventListener(
      "click",
      (e) => {
        this.#sliderButtonLogic(e);
      }
    );
  }

  #addAllEventListeners() {
    this.#DOMcache.sliderButtonsContainerElement.addEventListener(
      "click",
      (e) => {
        this.#sliderButtonLogic(e);
      }
    );
  }

  initializeEventListeners() {
    this.#removeAllEventListeners();
    this.#addAllEventListeners();
  }

  #buildCompleteSlider() {
    this.#buildContainer();
    this.#buildDisplay();
    this.#buildButtons();

    const {
      sliderContainerElement,
      sliderDisplayContainerElement,
      sliderButtonsContainerElement,
    } = this.#DOMcache;

    sliderContainerElement.appendChild(sliderDisplayContainerElement);
    sliderContainerElement.appendChild(sliderButtonsContainerElement);

    return sliderContainerElement;
  }

  #buildContainer() {
    const SCrange = document.createRange(),
      sliderContainerFrag = SCrange.createContextualFragment(
        this.#DOMtemplates.sliderContainer
      );
    this.#DOMcache.sliderContainerElement = sliderContainerFrag.querySelector(
      ".Image-Slider-Container"
    );

    this.#DOMcache.sliderContainerElement.classList.add(
      this.#stateData.uniqueIdentifier
    );
  }

  #buildDisplay() {
    const SDrange = document.createRange(),
      sliderDisplayFrag = SDrange.createContextualFragment(
        this.#DOMtemplates.sliderDisplay
      );

    this.#DOMcache.sliderDisplayContainerElement =
      sliderDisplayFrag.querySelector(".Image-Slider-Display");

    this.#DOMcache.sliderDisplayContainerElement.classList.add(
      this.#stateData.uniqueIdentifier
    );
  }

  #buildButtons() {
    const SBrange = document.createRange(),
      sliderButtonsFrag = SBrange.createContextualFragment(
        this.#DOMtemplates.sliderButtons
      );

    this.#DOMcache.sliderButtonsContainerElement =
      sliderButtonsFrag.querySelector(".Image-Slider-Buttons");

    this.#DOMcache.sliderButtonLeftElement = sliderButtonsFrag.querySelector(
      ".Image-Slider-Button.Left"
    );
    this.#DOMcache.sliderButtonCenterElement = sliderButtonsFrag.querySelector(
      ".Image-Slider-Button.Center"
    );
    this.#DOMcache.sliderButtonRightElement = sliderButtonsFrag.querySelector(
      ".Image-Slider-Button.Right"
    );
    const {
      sliderButtonsContainerElement,
      sliderButtonLeftElement,
      sliderButtonCenterElement,
      sliderButtonRightElement,
    } = this.#DOMcache;

    [
      sliderButtonsContainerElement,
      sliderButtonLeftElement,
      sliderButtonCenterElement,
      sliderButtonRightElement,
    ].forEach((element) => {
      element.classList.add(this.#stateData.uniqueIdentifier);
    });
  }

  #buildImage() {
    const SIrange = document.createRange(),
      sliderImageFrag = SIrange.createContextualFragment(
        this.#DOMtemplates.sliderImage
      ),
      sliderImageElement = sliderImageFrag.querySelector(".Image-Slider-Image");

    sliderImageElement.classList.add(this.#stateData.uniqueIdentifier);

    return sliderImageElement;
  }

  #mapImageIdentifiers(imageSet) {
    imageSet.forEach((imageElement, index = 0) => {
      const imageIdentifier = `Image-${index + 1}`;

      if (index === 0) {
        imageElement.classList.add("Selected");
      }

      imageElement.classList.add(imageIdentifier);

      this.#DOMcache[imageIdentifier] = imageElement;
      this.#stateData.DOMSliderImageClasses.push(imageIdentifier);
    });
  }

  #addImageElements(numOfImages) {
    const createdImageElements = [];

    if (numOfImages >= 2) {
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

  #appendSlider(parentElement, assembledSlider) {
    parentElement.append(assembledSlider);
  }

  init(parentElement) {
    if (
      parentElement &&
      typeof this.#stateData.uniqueIdentifier === "string" &&
      this.#stateData.numOfImages >= 2 &&
      !this.#stateData.init
    ) {
      const assembledSlider = this.#buildCompleteSlider();
      this.initializeEventListeners();

      this.#addImageElements(this.#stateData.numOfImages);

      this.#appendSlider(parentElement, assembledSlider);
      this.#initSliderAutoTransition();

      this.#stateData.init = !this.#stateData.init;
    }
  }
}
