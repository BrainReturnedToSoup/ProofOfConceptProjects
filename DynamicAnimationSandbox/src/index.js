import './stylesheets/css-reset.css'
import { Navbar } from "./modules/navbar.js";

const mainPageModules = {
    navbar: new Navbar(),
  },
  startApp = () => {
    mainPageModules.navbar.init();
  };

startApp();
