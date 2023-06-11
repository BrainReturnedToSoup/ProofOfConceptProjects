export class ImageSlider {
  constructor(uniqueIdentifier, numOfImages = 2) {
    if (numOfImages >= 2) {
      this.#uniqueIdentifier = uniqueIdentifier;
      this.#numOfImages = numOfImages;
    }
  }
  #DOMcache = {
    bodyElement: document.body,
  };
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

  #DOMSliderImageClasses = [];
  #arrCurrentKeySIC = 0;

  #userClickedSliderButton = false;
  #autoTransitionInterval = null;

  #numOfImages = 2;
  #uniqueIdentifier = "";

  #init = false;

  #initSliderAutoTransition() {
    if (!this.#autoTransitionInterval) {
      this.#autoTransitionInterval = setInterval(() => {
        this.#moveSliderRight();
      }, 2000);
    }
  }

  #moveSliderRight() {
    const currentSelectedImage =
      this.#DOMSliderImageClasses[this.#arrCurrentKeySIC];

    this.#arrCurrentKeySIC++;

    if (this.#arrCurrentKeySIC > this.#DOMSliderImageClasses.length - 1) {
      this.#arrCurrentKeySIC = 0;
    }

    const nextSelectedImage =
      this.#DOMSliderImageClasses[this.#arrCurrentKeySIC];

    this.#DOMcache[currentSelectedImage].classList.remove("Selected");
    this.#DOMcache[nextSelectedImage].classList.add("Selected");
  }
  #moveSliderLeft() {
    const currentSelectedImage =
      this.#DOMSliderImageClasses[this.#arrCurrentKeySIC];

    this.#arrCurrentKeySIC--;

    if (this.#arrCurrentKeySIC < 0) {
      this.#arrCurrentKeySIC = this.#DOMSliderImageClasses.length - 1;
    }

    this.#DOMcache[currentSelectedImage].classList.remove("Selected");
    this.#DOMcache[nextSelectedImage].classList.add("Selected");
  }
  #resetSliderPosition() {
    if (this.#arrCurrentKeySIC > 0) {
      const currentSelectedImage =
        this.#DOMSliderImageClasses[this.#arrCurrentKeySIC];

      this.#arrCurrentKeySIC = 0;

      const defaultSelectedImage =
        this.#DOMSliderImageClasses[this.#arrCurrentKeySIC];

      this.#DOMcache[currentSelectedImage].classList.remove("Selected");
      this.#DOMcache[defaultSelectedImage].classList.add("Selected");
    } else if (this.#arrCurrentKeySIC === 0) {
      return;
    } else {
      const currentSelectedImage =
        this.#DOMSliderImageClasses[this.#arrCurrentKeySIC];

      this.#arrCurrentKeySIC = 0;

      const defaultSelectedImage =
        this.#DOMSliderImageClasses[this.#arrCurrentKeySIC];

      this.#DOMcache[currentSelectedImage].classList.remove("Selected");
      this.#DOMcache[defaultSelectedImage].classList.add("Selected");
    }
  }

  #sliderButtonLogic(event) {}

  #removeAllEventListeners() {}

  #addAllEventListeners() {}

  initializeEventListeners() {
    this.#removeAllEventListeners();
    this.#addAllEventListeners();
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

    this.#DOMcache.sliderContainerElement.classList.add(this.#uniqueIdentifier);

    return sliderContainerFrag;
  }

  #buildDisplay() {
    const SDrange = document.createRange(),
      sliderDisplayFrag = SDrange.createContextualFragment(
        this.#DOMtemplates.sliderDisplay
      );

    this.#DOMcache.sliderDisplayContainerElement =
      sliderDisplayFrag.querySelector(".Image-Slider-Display");

    this.#DOMcache.sliderDisplayContainerElement.classList.add(
      this.#uniqueIdentifier
    );

    return sliderDisplayFrag;
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
      element.classList.add(this.#uniqueIdentifier);
    });

    return sliderButtonsFrag;
  }

  #buildImage() {
    const SIrange = document.createRange(),
      sliderImageFrag = SIrange.createContextualFragment(
        this.#DOMtemplates.sliderImage
      ),
      sliderImageElement = sliderImageFrag.querySelector(".Image-Slider-Image");

    sliderImageElement.classList.add(this.#uniqueIdentifier);

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
      this.#DOMSliderImageClasses.push(imageIdentifier);
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
    parentElement.appendChild(assembledSlider);
  }

  init(parentElement) {
    if (
      parentElement &&
      typeof this.#uniqueIdentifier === "string" &&
      this.#numOfImages >= 2 &&
      !this.#init
    ) {
      const assembledSlider = this.#buildCompleteSlider();
      this.initializeEventListeners(assembledSlider);

      this.#addImageElements(this.#numOfImages);

      this.#appendSlider(parentElement, assembledSlider);
      this.#initSliderAutoTransition();

      this.#init = !this.#init;
    }
  }
}
