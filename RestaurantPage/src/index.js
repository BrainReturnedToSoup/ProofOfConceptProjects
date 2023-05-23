import "./MainStyle.css";
import "./NavStyle.css";
import { Navbar, MainContent } from "./AppComponents";

function renderPage() {
  const navBar = new Navbar(),
    mainContent = new MainContent();

    navBar._init();
    mainContent._init();
}

renderPage();
