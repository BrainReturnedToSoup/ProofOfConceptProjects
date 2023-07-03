import { Form } from "./modules/Simple-Form-Module.js";

class App {
  start() {
    modules.form.appendForm(document.body);
  }
}

const modules = {
    form: new Form(["email", "zipCode", "password", "confirmPassword"], "#", "GET", "Sign Up"),
  },
  myApp = new App();

myApp.start();
