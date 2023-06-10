import "../stylesheets/navbar-styling.css";

export class Navbar {
  #DOMtemplates = {
    navBar: `
    <nav>
        appended dynamically
    </nav>
        `,
  };
  #DOMcache = {
    bodyElement: document.body,
  };
  #buildNavBar() {
    const range = document.createRange(),
      navBarFrag = range.createContextualFragment(this.#DOMtemplates.navBar);
    return navBarFrag;
  }
  #appendNavBar(frag) {
    const { bodyElement } = this.#DOMcache;
    if (!bodyElement.querySelector("nav")) {
      bodyElement.append(frag);
    }
  }
  init() {
    if (this.#DOMcache.bodyElement) {
      const navBarFrag = this.#buildNavBar();
      this.#appendNavBar(navBarFrag);
    }
  }
}
