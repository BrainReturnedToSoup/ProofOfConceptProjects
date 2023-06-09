import "./styles/css-reset.css";
import { PageStructure } from "./modules/Page-Structure.js";
import { SideNavBar } from "./modules/Side-Navbar";
import { Tasks } from "./modules/Tasks.js";
import { AppStatePublisher } from "./modules/App-State-PubSub";

const classInstance = {
    PageStructure: new PageStructure(),
    SideNavBar: new SideNavBar(),
    Tasks: new Tasks(),
  },
  renderHierarchyConfig = {
    0: [classInstance.PageStructure],
    1: [classInstance.SideNavBar, classInstance.Tasks],
  },
  initializeSubscribers = () => {},
  appRender = () => {
    for (let key in renderHierarchyConfig) {
      renderHierarchyConfig[key].forEach((module) => module.interface_init());
    }
  },
  startApp = () => {
    initializeSubscribers();
    appRender();
  };

startApp();
