import "../styles/tasks-style.css";

export class Tasks {
  #currentAppState = {
    selectedOption: "Inbox",
    todoInfo: [
      {
        text: "text for todo card goes here",
        date: "date value goes here",
        done: false,
        project: null,
      },
      {
        text: "text for todo card goes here",
        date: "date value goes here",
        done: true,
        project: "string of project name goes here",
      },
    ],
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
        cardContainerElement.querySelector(".Current-Selection"),
      cardListElement = cardContainerElement.querySelector(".Todo-Card-List");
    this.#DOMcache.cardContainerHeaderElement = cardContainerHeaderElement;
    this.#DOMcache.cardListElement = cardListElement;

    this.#renderSelectedHeader();

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
    const selectedCardsArr = this.#cardFiltering();
    if (selectedCardsArr.length > 0) {
      for (let todoCardObj of selectedCardsArr) {
        const range = document.createRange(),
          todoCardTemplate = range.createContextualFragment(
            this.#DOMtemplates.todoCard
          ),
          textBox = todoCardTemplate.querySelector(".Todo-Card-Left-Container");

        textBox.textContent = todoCardObj.text;

        const initializedTodoCard = todoCardTemplate;

        this.#DOMcache.cardListElement.append(initializedTodoCard);
      }
    }
  }

  #cardFiltering() {
    const { todoInfo, selectedOption } = this.#currentAppState;
    if (selectedOption?.project) {
      return this.#filterForProject(todoInfo, selectedOption);
    } else if (typeof selectedOption === "string") {
      return this.#filterForRegular(todoInfo, selectedOption);
    }
  }

  #filterForProject(todoInfo, selectedOption) {
    const selectedTodoCards = [];
    for (let todoCardObj of todoInfo) {
      if (todoCardObj.project === selectedOption) {
        selectedTodoCards.push(todoCardObj);
      }
    }
    return selectedTodoCards;
  }

  #filterForRegular(todoInfo, selectedOption) {
    const selectedTodoCards = [],
      currentDate = new Date();
    let comparedDayValue = null;

    switch (true) {
      case selectedOption === "Inbox":
        break;
      case selectedOption === "Today":
        comparedDayValue = 1;
        break;
      case selectedOption === "This Week":
        comparedDayValue = 7;
        break;
      default:
        throw new Error(
          `ERROR: invalid selected option, received ${selectedOption}`
        );
    }
    for (let todoCardObj of todoInfo) {
      if (comparedDayValue === null) {
        selectedTodoCards.push(todoCardObj);
        //will pass all cards essentially if this is true
        //only occurs for the Inbox selected option
      } else if (
        this.#daysDifferenceCalc(todoCardObj.date, currentDate) <
        comparedDayValue
      ) {
        selectedTodoCards.push(todoCardObj);
        //will filter cards that meet the time difference requirement which is defined by using the selected
        //option and a switch statement
      }
    }
    return selectedTodoCards;
  }

  #daysDifferenceCalc(todoCardDate, currentDate) {
    return (
      (currentDate.getTime() - todoCardDate.getTime()) / (24 * 60 * 60 * 1000)
    );
  }

  //functionality for rendering cards and giving each card functionality for their buttons goes here

  //needs to be able to iterate over all of the existing todo cards and retrieve specific ones based on the selected option
  //the retrieved todo cards will be stored on another data structure that is then forwarded to a todo card builder
  //and then a todo card renderer

  #emitStateChange() {
    //emit the change in appstate to the publisher so that it can relay the change to
    //the other modules
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

    this.#renderSelectedHeader();
    this.#renderCards();
  }
}
