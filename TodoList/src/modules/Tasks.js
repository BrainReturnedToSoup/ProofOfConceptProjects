import "../styles/tasks-style.css"
export class Tasks {
  #Appstate = {
    todoInfo: {
      projects: {
        todoText: 'date'
      },
      regular: {
        todoText: 'date'
      },
    },
  };
  #DOMcache = {
    bodyElement: document.querySelector("body"),
  };
  #DOMtemplates = {
    cardContainer: `
    <div class="todo-cards">
    </div>
    `,
    todoCard: `
    `,
  };
  #render() {

  }
  interface_init() {}
}
