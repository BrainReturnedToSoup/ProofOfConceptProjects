import "../styles/tasks-style.css";

export class Tasks {
  #currentAppState = {
    selectedOption: "This Week",
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
    cardContainer: `
    <div class="Todo-Card-Container">
      <h1 class="Current-Selection"></h1>
      <div class="Todo-Card-List">
      <div class="Add-Card">
        <div class="Add-Card-Text">Add Todo +</div>
          <form class="Add-Card-Form Form-Element">
           <input class="Form-Element">
            <button class="Form-Element">Add</button>
          </form>
      </div>
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
    addCard: `
    <div class="Add-Card">
      <div class="Add-Card-Text">Add Todo+</div>
      <form>
        <input>
        <button type="submit">Add</button>
        <button type="button">Cancel</button>
      </form>
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
      cardListElement = cardContainerElement.querySelector(".Todo-Card-List"),
      addCardElement = cardListElement.querySelector(".Add-Card");

    this.#DOMcache.cardContainerHeaderElement = cardContainerHeaderElement;
    this.#DOMcache.cardListElement = cardListElement;
    this.#DOMcache.addCardElement = addCardElement;

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
          textBox = todoCardTemplate.querySelector(".Todo-Card-Left-Container"),
          mainContainer = todoCardTemplate.querySelector(".Todo-Card");

        textBox.textContent = todoCardObj.text;

        const initializedTodoCard = todoCardTemplate;

        if (todoCardObj.done) {
          mainContainer.classList.add("Done");
        }

        this.#DOMcache.cardListElement.insertBefore(
          initializedTodoCard,
          this.#DOMcache.addCardElement
        );
        //iterates through the app state todo info array, creates a todo card for each todo card element, and appends it before the last child
        //The last child should always be the button that is used to add another todo item
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
        this.#daysDifferenceCalc(todoCardObj.date) < comparedDayValue
      ) {
        selectedTodoCards.push(todoCardObj);
        //will filter cards that meet the time difference requirement which is defined by using the selected
        //option and a switch statement
      }
    }
    return selectedTodoCards;
  }

  #daysDifferenceCalc(todoCardDateString) {
    const todoCardDate = new Date(todoCardDateString),
      currentDate = new Date(),
      differenceInDays =
        (currentDate.getTime() - todoCardDate.getTime()) /
        (60 * 60 * 1000 * 24);
    return differenceInDays;
  }

  //functionality for rendering cards and giving each card functionality for their buttons goes here

  //needs to be able to iterate over all of the existing todo cards and retrieve specific ones based on the selected option
  //the retrieved todo cards will be stored on another data structure that is then forwarded to a todo card builder
  //and then a todo card renderer

  //still need to add event listeners to activate the functionality for the individual todo cards

  #initCardListEventListener() {
    const { cardListElement } = this.#DOMcache;
    if (cardListElement) {
      cardListElement.removeEventListener("click", (e) => {
        this.#todoCardButtonLogic(e);
      });
      cardListElement.addEventListener("click", (e) => {
        this.#todoCardButtonLogic(e);
      });
    }
  }

  #todoCardButtonLogic(event) {
    const targetClassList = Array.from(event.target.classList);

    if (!targetClassList.includes("Form-Element")) {
      const { addCardElement } = this.#DOMcache,
        ACCEclassList = Array.from(addCardElement.classList);
      if (ACCEclassList.includes("Selected")) {
        const formElement = addCardElement.querySelector("form"),
          inputElement = formElement.querySelector("input");

        inputElement.value = "";
        addCardElement.classList.remove("Selected");
      }
    }

    //checks to see if you clicked off of a form, which if you did it resets the add book element essentially

    if (targetClassList.includes("Delete-Card")) {
      const rightContainer = event.target.parentElement,
        mainContainer = rightContainer.parentElement,
        textContainer = mainContainer.querySelector(
          ".Todo-Card-Left-Container"
        );
      this.#deleteTodoCard(textContainer.textContent);
      mainContainer.remove();
      //If the trashcan button is clicked on a card
      //should delete the todo card
      //also remove the todo card from the DOM without having to rerender all of the cards
    } else if (targetClassList.includes("Todo-Card-Left-Container")) {
      const mainContainer = event.target.parentElement,
        mainContainerClassList = Array.from(mainContainer.classList);
      this.#toggleTodoCardDone(event.target.textContent);
      if (
        mainContainerClassList.includes("Todo-Card") &&
        mainContainerClassList.includes("Done")
      ) {
        mainContainer.classList.remove("Done");
      } else if (mainContainerClassList.includes("Todo-Card")) {
        mainContainer.classList.add("Done");
      }
      //If anywhere else is clicked on the card
      //should toggle done status of that specific todo card
      //also remove the todo card from the DOM without having to rerender all of the cards
    } else if (targetClassList.includes("Add-Card-Text")) {
      const addCardContainerElement = event.target.parentElement,
        ACCEclassList = Array.from(addCardContainerElement.classList);
      if (
        ACCEclassList.includes("Add-Card") &&
        !ACCEclassList.includes("Selected")
      ) {
        addCardContainerElement.classList.add("Selected");
      }
    }
    //If you clicked on the add todo card link, it will transform the link into a form to fill out at which it's going to be another
    //todo card that will be added
  }

  #deleteTodoCard(todoCardText) {
    const { todoInfo } = this.#currentAppState;
    for (let todoCardIndex in todoInfo) {
      if (todoInfo[todoCardIndex].text === todoCardText) {
        todoInfo.splice(todoCardIndex, 1);
      }
    }
  }
  #toggleTodoCardDone(todoCardText) {
    const { todoInfo } = this.#currentAppState;
    for (let todoCard of todoInfo) {
      if (todoCard.text === todoCardText) {
        todoCard.done = !todoCard.done;
      }
    }
    6;
  }
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
      this.#initCardListEventListener();
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
