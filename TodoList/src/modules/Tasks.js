import "../styles/tasks-style.css";
import deleteButton from "../images-icons-logos/delete-card.svg";
import deleteButtonHighlight from '../images-icons-logos/delete-card-highlight.svg';

export class Tasks {
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
    cardContainer: `
    <div class="Todo-Card-Container">
      <h1 class="Current-Selection">Header for to do cards</h1>
      <div class="Todo-Card-List">
      </div>
    </div>
    `,
    todoCard: `
    <div class="Todo-Card">
      <div class="Todo-Card-Left-Container">rendered</div>
      <div class="Todo-Card-Right-Container">
        <div class="Delete-Card"></div>
      </div>
    </div>
    `,
  };
  #renderContainer() {
    const range = document.createRange(),
      cardContainerFrag = range.createContextualFragment(
        this.#DOMtemplates.cardContainer
      ),
      cardContainerElement = cardContainerFrag.querySelector(
        ".Todo-Card-Container"
      );
    cardContainerElement.addEventListener("click", (e) =>
      this.#eventListenerLogicClick(e)
    );
    this.#DOMcache.cardContainerElement = cardContainerElement;
    this.#DOMcache.contentElement.append(cardContainerFrag);
  }
  #renderCards() {
    const { cardContainerElement } = this.#DOMcache,
      todoCardListElement =
        cardContainerElement.querySelector(".Todo-Card-List"),
      range = document.createRange(),
      todoCardElement = range.createContextualFragment(
        this.#DOMtemplates.todoCard
      );
    todoCardListElement.append(todoCardElement);
  }
  #eventListenerLogicClick(event) {
    const targetClassList = Array.from(event.target.classList);
    if (targetClassList.includes("Delete-Button")) {
      //delete corresponding todo card
    }
  }
  #grabDependencies() {
    this.#DOMcache.contentElement =
      this.#DOMcache.bodyElement.querySelector(".Content");
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
