import { Form } from "./modules/form";

class App {
  start() {
    for (let module of Object.values(modules)) {
      module.init();
    }
  }
}

const modules = {
    form: new Form(),
  },
  myApp = new App();

myApp.start();
