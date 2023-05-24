import appLogo from "../images-icons-logos/to-do-list-logo.svg";

class PageStructure {
  #DOMcache = {
    bodyElement: document.querySelector("body"),
  };

  #headerTemplateDOM = `
        <div class="header-container">
        <img src="${appLogo}" alt="App-Logo">
        </div>
    `;

  #contentTemplateDOM = `
        <div class="content">
        <nav>

        </nav>
        <div class="todo-cards">

        </div>
        </div>
    `;

  #footerTemplateDOM = `
        <div class="footer-container">footer container</div>
    `;

  #render() {
    const { bodyElement } = this.#DOMcache;
    bodyElement.innerHTML =
      this.#headerTemplateDOM +
      this.#contentTemplateDOM +
      this.#footerTemplateDOM;
  }

  interface_init() {
    if (
      !document.querySelector(".header-container") ||
      !document.querySelector(".content") ||
      !document.querySelector(".footer-container")
    ) {
        this.#render();
    }
  }
}
