import "../styles/structure-style.css";
import appLogo from "../images-icons-logos/to-do-list-logo.svg";

export class PageStructure {
  #currentAppState = {
    selectedOption: "Inbox",
    existingProjects: [],
    todoInfo: {
      projects: {
        projectName: {
          todoText: {
            date: "date",
            done: "false",
          },
        },
      },
      regular: {
        todoText: {
          date: "date",
          done: "false",
        },
      },
    },
  };

  #DOMcache = {
    bodyElement: document.body,
  };

  #DOMtemplates = {
    header: `
        <div class="Header-Container">
        <img src="${appLogo}" alt="App-Logo">
        <h1>Todo List</h1>
        </div>
    `,

    content: `
        <div class="Content">

        </div>
    `,

    footer: `
        <div class="Footer-Container">© Copyright 2023 Nikkolas Minton</div>
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

  #appStateSubscriberMethods = [];

  #emitStateChange() {
    for (let emitMethod of this.#appStateSubscriberMethods) {
      emitMethod('publish', this.#currentAppState);
    }
  }

  interface_subscribe_appstate() {
    //
  }

  interface_init() {
    if (
      !document.querySelector(".Header-Container") ||
      !document.querySelector(".Content") ||
      !document.querySelector(".Footer-Container")
    ) {
      this.#render();
    }
  }

  interface_sync_appstate(newAppState) {
    this.#currentAppState = newAppState;
  }
}
