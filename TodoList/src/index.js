import "./styles/css-reset.css";
import { PageStructure } from "./modules/Page-Structure.js";
import { SideNavBar } from "./modules/Side-Navbar";
import { Tasks } from "./modules/Tasks.js";

const classInstance = {
    PageStructure: new PageStructure(),
    SideNavBar: new SideNavBar(),
    Tasks: new Tasks(),
  },
  renderHierarchyConfig = {
    0: [classInstance.PageStructure],
    1: [classInstance.SideNavBar, classInstance.Tasks],
  },
  AppRender = () => {
    for (let key in renderHierarchyConfig) {
      renderHierarchyConfig[key].forEach((module) => module.interface_init());
    }
  };

AppRender();
