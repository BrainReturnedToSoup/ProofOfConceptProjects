import "./MainStyle.css";
import "./NavStyle.css";
import { Navbar, MainContent } from "./AppComponents";

function renderPage() {
  Navbar._init();
  MainContent._init();
}

renderPage();
