import "../styles/tasks-style.css";

export class Tasks {
  #currentAppState = {
    selectedOption: "Inbox",
    existingProjects: [],
    todoInfo: [],
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
      <div class="Todo-Card-Left-Container"></div>
      <div class="Todo-Card-Right-Container">
        <div class="Delete-Card"></div>
      </div>
    </div>
    `,
    addCard: `
    <div class="Add-Card">
    <div class="Add-Card-Text">Add Todo +</div>
      <form class="Add-Card-Form Form-Element">
       <input name="TodoCardTextInput" class="Form-Element" required>
        <button class="Form-Element">Add</button>
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
    const { cardListElement } = this.#DOMcache,
      addCardRange = document.createRange(),
      addCardFrag = addCardRange.createContextualFragment(
        this.#DOMtemplates.addCard
      );

    this.#DOMcache.addCardElement = addCardFrag.querySelector(".Add-Card");

    cardListElement.innerHTML = "";

    cardListElement.append(addCardFrag);

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
      return this.#filterForProject(todoInfo, selectedOption.project);
    } else if (typeof selectedOption === "string") {
      return this.#filterForRegular(todoInfo, selectedOption);
    }
  }

  #filterForProject(todoInfo, targetProject) {
    const selectedTodoCards = [];

    if (this.#currentAppState.existingProjects.includes(targetProject)) {
      for (let todoCardObj of todoInfo) {
        if (todoCardObj.project === targetProject) {
          selectedTodoCards.push(todoCardObj);
        }
      }

      return selectedTodoCards;
    } else {
      throw new Error(
        "ERROR: target project not found in existing projects data"
      );
    }
  }

  #filterForRegular(todoInfo, selectedOption) {
    const selectedTodoCards = [];
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

  #initCardListEventListeners() {
    const { cardListElement } = this.#DOMcache;
    if (cardListElement) {
      cardListElement.removeEventListener("click", (e) => {
        this.#todoCardButtonLogic(e);
      });
      cardListElement.addEventListener("click", (e) => {
        this.#todoCardButtonLogic(e);
      });
      cardListElement.removeEventListener("submit", (e) => {
        this.#addCardSubmissionLogic(e);
      });
      cardListElement.addEventListener("submit", (e) => {
        this.#addCardSubmissionLogic(e);
      });
    }
  }

  #addCardSubmissionLogic(event) {
    event.preventDefault();

    const formData = new FormData(event.target),
      enteredText = formData.get("TodoCardTextInput"),
      currentDate = new Date(),
      storedDateString = currentDate.toISOString();

    if (typeof enteredText === "string") {
      const newTodoCardObj = {
        text: enteredText,
        date: storedDateString,
        done: false,
        project: null,
      };
      const { selectedOption, todoInfo } = this.#currentAppState;
      if (selectedOption["project"]) {
        newTodoCardObj.project = selectedOption["project"];
      }

      todoInfo.push(newTodoCardObj);

      this.#renderCards();
      this.#emitStateChange();
    }
  }
  //logic for when a submit event within the card list happens,
  //thus it will only be for instances at which a new card is added

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
      this.#emitStateChange();
      //If the trashcan button is clicked on a card
      //should delete the todo card
      //remove the todo card from the DOM without having to rerender all of the cards
      //emit the state change to other modules
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

      this.#emitStateChange();
      //If anywhere else is clicked on the card
      //should toggle done status of that specific todo card
      //also remove the todo card from the DOM without having to rerender all of the cards
      //emit the change to other modules
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
  }

  #grabDependencies() {
    this.#DOMcache.contentElement =
      this.#DOMcache.bodyElement.querySelector(".Content");
    this.#DOMcache.navbarElement =
      this.#DOMcache.contentElement.querySelector("nav");
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
    if (!this.#DOMcache.contentElement || !this.#DOMcache.navbarElement) {
      this.#grabDependencies();
    }
    if (this.#DOMcache.contentElement && this.#DOMcache.navbarElement) {
      this.#renderContainer();
      this.#initCardListEventListeners();
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
