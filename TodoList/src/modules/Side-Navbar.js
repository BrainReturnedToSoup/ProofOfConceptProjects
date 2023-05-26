import "../styles/navbar-style.css";

export class SideNavBar {
  #Appstate = {
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
        <li>This week</li>
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
    this.#DOMcache.contentElement = document.body.querySelector(".content");
  }
  #render() {
    const { contentElement } = this.#DOMcache,
      range = document.createRange(),
      navBarElement = range.createContextualFragment(this.#DOMtemplate);

    contentElement.append(navBarElement);
  }

  interface_init() {
    this.#grabDependencies();

    const { contentElement } = this.#DOMcache;
    if (contentElement && !contentElement.querySelector("nav")) {
      this.#render();
    }
  }
}
