import { Form } from "./modules/form";

class App {
  start() {
    modules.form.appendForm(document.body);
  }
}

const modules = {
    form: new Form(
      ["email", "zipCode", "password", "confirmPassword"],
      "#",
      "GET"
    ),
  },
  myApp = new App();

myApp.start();
