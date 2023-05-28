import "../styles/navbar-style.css";

export class SideNavBar {
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
  #DOMtemplate = `
    <nav>
      <ul>
        <li>Inbox</li>
        <li>Today</li>
        <li>This Week</li>
      </ul>
      <h3>Projects</h3>
      <div class="Projects-List">
        <div class="Projects-List-Project-Button">Project 1</div>
        <div class="Projects-List-Project-Button">Project 2</div>
        <div class="Projects-List-Project-Button">Project 3</div>
        <div class="Projects-List-Project-Button">Project 4</div>
        <div class="Projects-List-Project-Button">Project 5</div>
        <div class="Projects-List-Project-Button">Project 6</div>
      </div>
      <div class="Add-Project-Container">
          <div class="Add-Project-Button">Add Project</div>
          <form></form>
      </div>
    </nav>
    `;
  #grabDependencies() {
    this.#DOMcache.contentElement =
      this.#DOMcache.bodyElement.querySelector(".content");
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
  #eventListenerLogic(event) {
    if (event.target.tagName === "LI") {
      this.#currentAppState.selectedOption = event.target.textContent;
    } else if (
      Array.from(event.target.classList).includes(
        "Projects-List-Project-Button"
      )
    ) {
      this.#currentAppState.selectedOption = {
        project: event.target.textContent,
      };
    }
    this.#selectedButtonStyling();
  }
  #render() {
    const { contentElement } = this.#DOMcache,
      range = document.createRange(),
      navBarElement = range.createContextualFragment(this.#DOMtemplate),
      navElement = navBarElement.querySelector("nav");

    navElement.addEventListener("click", (e) => {
      this.#eventListenerLogic(e);
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
