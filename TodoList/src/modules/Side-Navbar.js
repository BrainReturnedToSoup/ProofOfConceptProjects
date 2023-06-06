import "../styles/navbar-style.css";

export class SideNavBar {
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
    mainStructure: `
    <nav>
      <ul>
        <li>Inbox</li>
        <li>Today</li>
        <li>This Week</li>
      </ul>
      <h3>Projects</h3>
      <div class="Projects-List"> 
      </div>
      <div class="Add-Project-Container">
          <div class="Add-Project-Button">Add Project</div>
          <form></form>
      </div>
    </nav>
    `,
    projectButton: `
    <div class="Projects-List-Project-Button">Project 1</div>
    `,
  };
  #grabDependencies() {
    this.#DOMcache.contentElement =
      this.#DOMcache.bodyElement.querySelector(".Content");
  }

  #selectedButtonStyling() {
    const { selectedOption } = this.#currentAppState,
      navButtons = Array.from(
        this.#DOMcache.navBarElement.querySelectorAll("li")
      ),
      projectButtons = Array.from(
        this.#DOMcache.navBarElement.querySelectorAll(
          ".Projects-List-Project-Button"
        )
      );

    navButtons.forEach((button) => button.removeAttribute("style"));
    projectButtons.forEach((button) => button.removeAttribute("style"));

    switch (true) {
      case selectedOption === "Inbox":
        this.#selectedButtonStyling_Nav(navButtons[0]);
        break;
      case selectedOption === "Today":
        this.#selectedButtonStyling_Nav(navButtons[1]);
        break;
      case selectedOption === "This Week":
        this.#selectedButtonStyling_Nav(navButtons[2]);
        break;
      case selectedOption instanceof Object &&
        selectedOption.hasOwnProperty("project"):
        this.#selectedButtonStyling_Project(selectedOption, projectButtons);
        break;
      default:
        throw new Error(
          `ERROR: selected option value invalid, received ${selectedOption}`
        );
    }
  }
  #selectedButtonStyling_Nav(targetButton) {
    targetButton.style["font-weight"] = "700";
  }
  #selectedButtonStyling_Project(projectObject, projectButtons) {
    const { project } = projectObject;
    for (let button of projectButtons) {
      if (button.textContent === project) {
        button.style["font-weight"] = "700";
        break;
      }
    }
  }
  #clickEventListenerLogic(event) {
    if (event.target.tagName === "LI") {
      this.#currentAppState.selectedOption = event.target.textContent;
      this.#selectedButtonStyling();
    } else if (
      Array.from(event.target.classList).includes(
        "Projects-List-Project-Button"
      )
    ) {
      this.#currentAppState.selectedOption = {
        project: event.target.textContent,
      };
      this.#selectedButtonStyling();
    }
  }

  #submitEventListenerLogic(event) {}
  #render() {
    const { contentElement } = this.#DOMcache,
      range = document.createRange(),
      navBarElement = range.createContextualFragment(
        this.#DOMtemplates.mainStructure
      ),
      navElement = navBarElement.querySelector("nav");

    navElement.addEventListener("click", (e) => {
      this.#clickEventListenerLogic(e);
    });

    this.#DOMcache.navBarElement = navElement;

    contentElement.append(navBarElement);
  }
  interface_init() {
    this.#grabDependencies();

    const { contentElement } = this.#DOMcache;
    if (contentElement && !contentElement.querySelector("nav")) {
      this.#render();
      this.#selectedButtonStyling();
    }
  }
  interface_sync_appstate(newAppState) {
    this.#currentAppState = newAppState;
    this.#selectedButtonStyling();
  }
}
