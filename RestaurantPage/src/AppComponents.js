class Navbar {
  #DOMcache = {
    bodyElement: document.querySelector("body"),
  };

  #navbarTemplate = `
    <div class="Nav-Buttons">
      <div class="Nav-Buttons Left-Container">
        <button class="About">About</button>
        <button class="Menus">Menus</button>
        <button class="Private-Rooms">Private Rooms</button>
      </div>
      <h1 class="Nav-Buttons Center-Logo">Via Real</h1>
      <div class="Nav-Buttons Right-Container">
        <button class="Gift-Card">Gift Card</button>
        <button class="Reservations">Reservations</button>
        <button class="Contact-Us">Contact Us</button>
      </div>
    </div>
    <div class="Nav-Trim">
      <h3>EASTER BRUNCH</h3>
      <h4>RESERVATIONS ARE AVAILABLE AT 10, 12, and 2. CALL SOON!</h4>
    </div>
    `;

  #render() {
    const navElement = document.createElement("nav");
    navElement.innerHTML = this.#navbarTemplate;
    this.#addEventListener(navElement);
    this.#DOMcache.bodyElement.innerHTML = navElement;
  }
  #addEventListener(targetElement) {
    targetElement.addEventListener("click", (e) => {});
  }
  static _init() {
    if (this.#DOMcache.bodyElement.getElementsByTagName("nav").length === 0) {
      this.#render();
    }
  }
}

class MainContent {
  #DOMCache = {
    bodyElement: document.querySelector("body"),
  };
  #mainContentTemplate = `
  <div class="content-container">
    <h1>Welcome</h1>
    <h4>To the oasis of Las Cosinas in Irving, TX.</h4>
    <button class="Book-Table">Book A Table</button>
    <div class="Card-Slider"></div>
  </div>
  `;
  #render() {
    const contentWrapper = document.createElement("div");
    contentWrapper.setAttribute("id", "content");
    contentWrapper.innerHTML = this.#mainContentTemplate;
    this.#addEventListener(contentWrapper);
    this.#DOMCache.bodyElement.appendChild(contentWrapper);
  }
  #addEventListener(targetElement) {
    targetElement.addEventListener("click", () => {});
  }
  static _init() {
    if (!this.#DOMCache.bodyElement.getElementById("content")) {
      this.#render();
    }
  }
}


export { Navbar, MainContent}
