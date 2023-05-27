import "../styles/navbar-style.css";

export class SideNavBar {
  #currentAppState = {
    selectedOption: { project: "project name" },
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
          ".Project-List-Project-Button"
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
      case typeof selectedOption === "object" && selectedOption["project"]:
        this.#selectedButtonStyling_Project(selectedOption);
        break;
      default:
        throw new Error(
          `ERROR: selected option value invalid, received ${selectedOption}`
        );
    }
  }
  #selectedButtonStyling_Nav(targetButton) {

  }
  #selectedButtonStyling_Project(projectObject) {}
  #render() {
    const { contentElement } = this.#DOMcache,
      range = document.createRange(),
      navBarElement = range.createContextualFragment(this.#DOMtemplate);
    this.#DOMcache.navBarElement = navBarElement;

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
