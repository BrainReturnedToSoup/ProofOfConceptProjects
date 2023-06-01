import "../styles/tasks-style.css";

export class Tasks {
  #currentAppState = {
    selectedOption: "Inbox",
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
    cardContainer: `
    <div class="Todo-Card-Container">
      <h1 class="Current-Selection"></h1>
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
      ),
      cardContainerHeaderElement =
        cardContainerElement.querySelector(".Current-Selection");
    this.#DOMcache.cardContainerHeaderElement = cardContainerHeaderElement;

    this.#renderSelectedHeader();

    cardContainerElement.addEventListener("click", (e) =>
      this.#eventListenerLogic(e)
    );
    this.#DOMcache.cardContainerElement = cardContainerElement;
    this.#DOMcache.contentElement.append(cardContainerFrag);
  }
  #renderSelectedHeader() {
    if (typeof this.#currentAppState.selectedOption === "string") {
      this.#DOMcache.cardContainerHeaderElement.textContent =
        this.#currentAppState.selectedOption;
    } else if (
      this.#currentAppState.selectedOption instanceof Object &&
      this.#currentAppState.selectedOption["project"]
    ) {
      this.#DOMcache.cardContainerHeaderElement.textContent =
        this.#currentAppState.selectedOption["project"];
    } else {
      this.#DOMcache.cardContainerHeaderElement.textContent = "null";
    }
  }
  #renderCards() {
    const { cardContainerElement } = this.#DOMcache,
      { selectedOption } = this.#currentAppState;

    if (!this.#DOMcache.todoCardListElement) {
      const todoCardListElement =
        cardContainerElement.querySelector(".Todo-Card-List");
      this.#DOMcache.todoCardListElement = todoCardListElement;
    }

    switch (true) {
      case typeof selectedOption === "string":
        this.#renderNormalCards(selectedOption);
        break;
      case selectedOption instanceof Object &&
        selectedOption.hasOwnProperty("project"):
        this.#renderProjectCards();
        break;
      default:
        throw new Error(
          `ERROR: selected option value invalid, received ${selectedOption}`
        );
    }
  }

  #renderNormalCards(selectedOption) {
    const allProjects = this.#currentAppState.todoInfo.projects,
      regularTodoCards = this.#currentAppState.todoInfo.regular;

    if (Object.keys(this.#todoCardFilterMethods).includes(selectedOption)) {
      const selectedTodoCards = this.#todoCardFilterMethods[selectedOption]([
        regularTodoCards,
        allProjects,
      ]);
      this.#todoCardBuilder(selectedTodoCards);
    } else {
      throw new Error(
        `ERROR: Invalied selected option, received ${selectedOption}`
      );
    }
  }

  #renderProjectCards() {
    const specificProject = this.#currentAppState.selectedOption["project"],
      selectedTodoCards =
        this.#todoCardFilterMethods["Project"](specificProject);
    this.#todoCardBuilder(selectedTodoCards);
  }

  #todoCardFilterMethods = {
    Inbox: (todoCardsRefArr) => {
      const selectedTodoCards = [];
      //add filtering here and add it to the arr
      return selectedTodoCards;
    },
    Today: (todoCardsRefArr) => {
      const selectedTodoCards = [];
      //add filtering here and add it to the arr
      return selectedTodoCards;
    },
    "This Week": (todoCardsRefArr) => {
      const selectedTodoCards = [];
      //add filtering here and add it to the arr
      return selectedTodoCards;
    },
    Project: (specificProject) => {
      const selectedTodoCards = [];
      //add filtering here and add it to the arr
      return selectedTodoCards;
    },
  };

  #todoCardBuilder(selectedTodoCardsArr) {
    for (let todoCard of selectedTodoCardsArr) {
    }
  }

  #eventListenerLogic(event) {
    const targetClassList = Array.from(event.target.classList);
    if (targetClassList.includes("Delete-Button")) {
      //delete corresponding todo card in the app state datastructure,
      //initialize the rendering of the todo card state,
      //emit the state change to all other modules so they can render based on the new state
    }
  }

  #emitStateChange() {}

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

    this.#renderSelectedHeader();
    this.#renderCards();
  }
}
