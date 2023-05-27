import "../styles/tasks-style.css";
export class Tasks {
  #currentAppState = {
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
    cardContainer: `
    <div class="todo-cards">
    </div>
    `,
    todoCard: `
    `,
  };
  #renderContainer() {
    const range = document.createRange(),
      cardContainerElement = range.createContextualFragment(
        this.#DOMtemplates.cardContainer
      );
    this.#DOMcache.contentElement.append(cardContainerElement);
    this.#DOMcache.cardContainerElement = cardContainerElement;
  }
  #renderCards() {
    const { cardContainerElement } = this.#DOMcache;
  }
  #grabDependencies() {
    this.#DOMcache.contentElement =
      this.#DOMcache.bodyElement.querySelector(".content");
    this.#DOMcache.navbarElement =
      this.#DOMcache.contentElement.querySelector("nav");
  }
  interface_init() {
    if (!this.#DOMcache.contentElement || !this.#DOMcache.navbarElement) {
      this.#grabDependencies();
    }
    if (this.#DOMcache.contentElement && this.#DOMcache.navbarElement) {
      this.#renderContainer();
    }
    if (this.#DOMcache.cardContainerElement) {
      this.#renderCards();
    }
  }
  interface_sync_appstate(newAppState) {
    this.#currentAppState = newAppState;
    this.#renderCards();
  }
}
