import "./styles/css-reset.css";
import { PageStructure } from "./modules/Page-Structure.js";
import { SideNavBar } from "./modules/Side-Navbar";
import { Tasks } from "./modules/Tasks.js";

const classInstance = {
  PageStructure: new PageStructure(),
  SideNavBar: new SideNavBar(),
  Tasks: new Tasks(),
};

const renderHierarchyConfig = {
  0: [classInstance.PageStructure],
  //1: [ classInstance.SideNavBar, classInstance.Tasks ],
};

const AppRender = () => {
  for (let value of renderHierarchyConfig) {
    value.forEach((module) => module.interface_init());
  }
};

classInstance.PageStructure.interface_init();
classInstance.SideNavBar.interface_init();
