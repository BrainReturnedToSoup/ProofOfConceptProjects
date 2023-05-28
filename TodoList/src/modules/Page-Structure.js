import "../styles/structure-style.css";
import appLogo from "../images-icons-logos/to-do-list-logo.svg";

export class PageStructure {
  #currentAppState = {
    selectedOption: "Inbox",
    todoInfo: {
      projects: {
        todoText: "date",
      },
      regular: {
        todoText: "date",
      },
    },
  };
  #DOMcache = {
    bodyElement: document.body,
  };
  #DOMtemplates = {
    header: `
        <div class="header-container">
        <img src="${appLogo}" alt="App-Logo">
        <h1>Todo List</h1>
        </div>
    `,

    content: `
        <div class="content">

        </div>
    `,

    footer: `
        <div class="footer-container">© Copyright 2023 Nikkolas Minton</div>
    `,
  };

  #render() {
    const { bodyElement } = this.#DOMcache,
      range = document.createRange();

    for (let templateName in this.#DOMtemplates) {
      const currentFrag = range.createContextualFragment(
        this.#DOMtemplates[templateName]
      );

      bodyElement.append(currentFrag);
    }
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
  interface_sync_appstate(newAppState) {
    this.#currentAppState = newAppState;
  }
}
