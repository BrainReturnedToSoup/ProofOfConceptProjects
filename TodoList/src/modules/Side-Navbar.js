import "../styles/navbar-style.css";

export class SideNavBar {
  #currentAppState = {
    selectedOption: "Inbox",
    existingProjects: ["among us"],
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
          <form class="Form-Element">
            <input class="Form-Element" name="NewProjectName" required>
            <button>Add</button>
          </form>
      </div>
    </nav>
    `,
    projectButton: `
    <div class="Projects-List-Project-Button">
      <div class="Project-Button-Text"></div>
      <div class="Delete-Project-Button"></div>
    </div>
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
      projectButtonsElements = Array.from(
        this.#DOMcache.navBarElement.querySelectorAll(
          ".Projects-List-Project-Button"
        )
      ),
      projectButtonsTextElements = projectButtonsElements.map(
        (projectButtonElement) => {
          //return a new array of each project button text element
          return projectButtonElement.querySelector(".Project-Button-Text");
        }
      );

    navButtons.forEach((button) => button.removeAttribute("style"));
    projectButtonsTextElements.forEach((button) =>
      button.removeAttribute("style")
    );

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
        this.#selectedButtonStyling_Project(
          selectedOption,
          projectButtonsTextElements
        );
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
  #navbarFunctionality(event) {
    const targetClassList = Array.from(event.target.classList);

    if (!this.#DOMcache.addProjectContainer) {
      this.#DOMcache.addProjectContainer =
        this.#DOMcache.navBarElement.querySelector(".Add-Project-Container");
    }
    if (
      Array.from(this.#DOMcache.addProjectContainer.classList).includes(
        "Selected"
      ) &&
      !targetClassList.includes("Form-Element")
    ) {
      this.#DOMcache.addProjectContainer.classList.remove("Selected");
    }

    if (event.target.tagName === "LI") {
      this.#currentAppState.selectedOption = event.target.textContent;
      this.#selectedButtonStyling();
    } else if (targetClassList.includes("Project-Button-Text")) {
      this.#currentAppState.selectedOption = {
        project: event.target.textContent,
      };
      this.#selectedButtonStyling();
    } else if (targetClassList.includes("Projects-List-Project-Button")) {
      this.#currentAppState.selectedOption = {
        project: event.target.children[0].textContent,
      };
      this.#selectedButtonStyling();
    } else if (targetClassList.includes("Add-Project-Button")) {
      const addButtonContainer = event.target.parentElement;
      addButtonContainer.classList.add("Selected");
    }
  }

  #submitNewProject(event) {
    //add the project to the existing projects property in the app state
    event.preventDefault();

    const formData = new FormData(event.target),
      projectName = formData.get("NewProjectName");

    if (typeof projectName === "string") {
      this.#currentAppState.existingProjects.push(projectName);
      this.#renderProjectButtons();
    }
  }

  #initializeEventListeners() {
    if (this.#DOMcache.navBarElement) {
      this.#DOMcache.navBarElement.removeEventListener("click", (e) => {
        this.#navbarFunctionality(e);
      });
      this.#DOMcache.navBarElement.addEventListener("click", (e) => {
        this.#navbarFunctionality(e);
      });
      this.#DOMcache.navBarElement.removeEventListener("submit", (e) => {
        this.#submitNewProject(e);
      });
      this.#DOMcache.navBarElement.addEventListener("submit", (e) => {
        this.#submitNewProject(e);
      });
    }
  }
  #render() {
    const { contentElement } = this.#DOMcache,
      range = document.createRange(),
      navBarElement = range.createContextualFragment(
        this.#DOMtemplates.mainStructure
      ),
      navElement = navBarElement.querySelector("nav");

    this.#DOMcache.navBarElement = navElement;

    contentElement.append(navBarElement);
  }

  #renderProjectButtons() {
    if (!this.#DOMcache.projectsList) {
      this.#DOMcache.projectsList =
        this.#DOMcache.navBarElement.querySelector(".Projects-List");
      //checks if the projectsList element has been references and saved in the cache
      //if not it defines such
    }

    const { projectsList } = this.#DOMcache,
      { existingProjects } = this.#currentAppState;

    projectsList.innerHTML = "";

    if (existingProjects.length > 0) {
      //if there are existing projects
      const { projectButton } = this.#DOMtemplates;
      projectsList.style.display = "";

      for (let projectName of existingProjects) {
        const range = document.createRange(),
          projectButtonFrag = range.createContextualFragment(projectButton),
          projectButtonTextElement = projectButtonFrag.querySelector(
            ".Project-Button-Text"
          );

        projectButtonTextElement.textContent = projectName;

        const initializedProjectButton = projectButtonFrag;
        projectsList.append(initializedProjectButton);
      }
    } else {
      //if there aren't any existingg projects
      projectsList.style.display = "none";
    }
  }
  interface_init() {
    this.#grabDependencies();

    const { contentElement } = this.#DOMcache;
    if (contentElement && !contentElement.querySelector("nav")) {
      this.#render();
      this.#renderProjectButtons();
      this.#initializeEventListeners();
      this.#selectedButtonStyling();
    }
  }
  interface_sync_appstate(newAppState) {
    this.#currentAppState = newAppState;
    this.#selectedButtonStyling();
  }
}
