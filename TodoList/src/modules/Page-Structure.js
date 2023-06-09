import "../styles/structure-style.css";
import appLogo from "../images-icons-logos/to-do-list-logo.svg";

export class PageStructure {
  #currentAppState = {
    selectedOption: "Inbox",
    existingProjects: [],
    todoInfo: [
      {
        text: "first todo",
        date: "2023-06-06T13:30:00.000z",
        done: false,
        project: null,
      },
      {
        text: "second todo",
        date: "2023-06-01T13:30:00.000z",
        done: true,
        project: "string of project name goes here",
      },
    ],
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
      emitMethod(this.#currentAppState);
    }
  }

  interface_subscribe_appstate(method) {
    if (!this.#appStateSubscriberMethods.includes(method)) {
      this.#appStateSubscriberMethods.push(method);
    }
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
