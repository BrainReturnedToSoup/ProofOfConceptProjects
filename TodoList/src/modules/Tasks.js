import "../styles/tasks-style.css";

export class Tasks {
  #currentAppState = {
    selectedOption: "Inbox",
    todoInfo: {
      projects: {
        projectName: {
          todoTextProject: {
            date: "date",
            done: false,
          },
        },
      },
      regular: {
        todoText: {
          date: "date",
          done: false,
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
      const selectedTodoCards = this.#todoCardFilterMethods[selectedOption]();
      this.#todoCardFactory.builder(selectedTodoCards);
    } else {
      throw new Error(
        `ERROR: Invalid selected option, received ${selectedOption}`
      );
    }
  }

  #renderProjectCards() {
    const specificProject = this.#currentAppState.selectedOption["project"],
      selectedTodoCards =
        this.#todoCardFilterMethods["Project"](specificProject);
    this.#todoCardFactory.builder(selectedTodoCards);
  }

  #todoCardFilterMethods = {
    Inbox: function () {
      const allCards = this.mainFilter("All");
    },
    //filtering for all existing cards
    Today: function () {
      const cardsWithinToday = this.mainFilter("All", "Today");
    },
    //filtering for cards within the app state that fall within the created today category
    "This Week": function () {
      const cardsWithinThisWeek = this.mainFilter("All", "This Week");
    },
    //filtering for cards within the app state that fall within the created this week category
    Project: function (specificProject) {
      const selectedOptionTarget = this.grabCurrentSelectedOptionTarget(),
        cardsWithinToday = this.mainFilter(
          "All",
          "Project",
          selectedOptionTarget
        );
    },
    //filtering for cards within the app state that fall within a specific selected project category
    mainFilter: (command, inputCondition, targetProjArg) => {
      const { projects, regular } = this.#currentAppState.todoInfo,
        currentDate = new Date();
      let foundCards = [],
        comparedDayValue = null,
        targetProject = null;

      switch (inputCondition) {
        case "Today":
          comparedDayValue = 1;
          break;
        case "This Week":
          comparedDayValue = 7;
          break;
        case "Project":
          if (targetProjArg !== undefined) {
            targetProject = targetProjArg;
          } else {
            throw new Error("ERROR: Invalid target project argument");
          }
          break;
        default:
          throw new Error("ERROR: Invalid input condition");
      }

      if (command === "All") {
        for (let todoCard in regular) {
          if (comparedDayValue === null && targetProject === null) {
            foundCards.push(regular[todoCard]);
            //pushes all non project cards into the foundCards array if the inbox selection is selected
          } else if (
            typeof comparedDayValue === "number" &&
            targetProject === null
          ) {
            const fallsWithinTimeRange =
              comparedDayValue >
              this.#dateDifferenceInDays(currentDate, regular[todoCard].date);
            if (fallsWithinTimeRange) {
              foundCards.push(regular[todoCard]);
              //pushes the todo cards that fall within the defined timeframe into the foundCards array
            }
          }
        }
      }

      if (command === "All" || command === "ProjectsOnly") {
        for (let project in projects) {
          for (let todoCard in projects[project]) {
            if (comparedDayValue === null && targetProject === null) {
              foundCards.push(projects[project][todoCard]);
              //pushes all project todo cards that exist within all projects into the foundCards array
            } else if (
              typeof targetProject === "string" &&
              projects[project] === projects[targetProject] &&
              comparedDayValue === null
            ) {
              //checking to see if a target project has been defined, and if the current project being iterated through is the
              //corresponding project, and if there isn't a compared day timeframe value, thus pushing all todo cards within this
              //specific project into the array
              foundCards.push(projects[project][todoCard]);
            } else if (
              typeof comparedDayValue === "number" &&
              targetProject === null
            ) {
              const fallsWithinTimeRange =
                comparedDayValue >
                this.#dateDifferenceInDays(currentDate, regular[todoCard].date);
              if (fallsWithinTimeRange) {
                foundCards.push(regular[todoCard]);
                //pushes the todo cards that fall within the defined timeframe into the foundCards array
              }
            }
          }
        }
      }
      return foundCards;
    },
    //general iterator and filter method that the others will use, behavior defined by its args supplied
    grabCurrentSelectedOptionTarget: () => {
      if (this.#currentAppState.selectedOption?.["project"]) {
        return this.#currentAppState.selectedOption["project"];
      } else {
        return this.#currentAppState.selectedOption;
      }
    },
  };

  #dateDifferenceInDays = (referenceDate, todoCardDate) => {
    return (
      (referenceDate.getTime() - todoCardDate.getTime()) / (24 * 60 * 60 * 1000)
    );
  };
  #todoCardFactory = {
    builder: function (selectedTodoCardsArr) {
      for (let todoCard of selectedTodoCardsArr) {
        const range = document.createRange(),
          todoCardFrag = range.createContextualFragment(
            this.#DOMtemplates.todoCard
          ),
          todoCardText = Object.keys(todoCard)[0],
          todoCardDate = todoCard[todoCardText].date,
          todoCardDone = todoCard[todoCardText].done,
          textContainer = todoCardFrag.querySelector(
            ".Todo-Card-Left-Container"
          );

        textContainer.textContent = todoCardText;

        this.#DOMcache.todoCardListElement.append(todoCardFrag);
      }
    },
    appendToDOM: () => {},
  };

  #eventListenerLogic(event) {
    const targetClassList = Array.from(event.target.classList);
    if (targetClassList.includes("Delete-Card")) {
      const todoCard = event.target.parentNode.parentNode,
        textContainer = todoCard.querySelector(".Todo-Card-Left-Container"),
        textContent = textContainer.textContent;

      this.#todoCardFunctionality.deleteTodoCard(textContent);
      this.#DOMcache.todoCardListElement.innerHTML = "";
      this.#renderCards();
      this.#emitStateChange();
    } else if (targetClassList.includes("Todo-Card-Left-Container")) {
      this.#todoCardFunctionality.toggleDoneStatus(textContent);
      this.#DOMcache.todoCardListElement.innerHTML = "";
      this.#renderCards();
      this.#emitStateChange();
    }
    //find the todo card text within the clicked card
    //make change to data structure
    //clear the necessary containers
    //initialize the rendering of the todo card state thats based off of the current data structure,
    //includes rendering the header of the todo cards
    //emit the state change to all other modules so they can render based on the new state
  }

  #todoCardFunctionality = {
    toggleDoneStatus: function (todoCardText) {
      const targetCardPath = this.findTodoCardPath(todoCardText);
      if (targetCardPath !== null) {
        targetCardPath.done = !targetCardPath.done;
      }
    },

    deleteTodoCard: function (todoCardText) {
      const targetCardPath = this.findTodoCardPath(todoCardText);
      if (targetCardPath !== null) {
        delete eval(targetCardPath);
      }
    },

    findTodoCardPath: (condition) => {
      const { projects, regular } = this.#currentAppState.todoInfo,
        pathString = "this.#currentAppState.todoInfo";
      let cardFound = false;

      for (let project in projects) {
        if (cardFound) break;
        for (let todoCard in projects[project]) {
          if (cardFound) break;
          if (todoCard === condition) {
            pathString += `.projects[${project}][${todoCard}]`;
            cardFound = !cardFound;
          }
        }
      }
      if (!cardFound) {
        for (let todoCard in regular) {
          if (cardFound) break;
          if (todoCard === condition) {
            pathString += `.regular[${todoCard}]`;
            cardFound = !cardFound;
          }
        }
      }

      if (cardFound && pathString !== "this.#currentAppState.todoInfo") {
        return pathString;
      } else {
        return null;
      }
    },
  };

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
