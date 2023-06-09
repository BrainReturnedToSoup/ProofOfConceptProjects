import "./styles/css-reset.css";
import { PageStructure } from "./modules/Page-Structure.js";
import { SideNavBar } from "./modules/Side-Navbar";
import { Tasks } from "./modules/Tasks.js";
import { AppStatePublisher } from "./modules/App-State-PubSub";
import { localStorageAppState } from "./modules/Local-Storage-Handling";

const classInstance = {
    PageStructure: new PageStructure(),
    SideNavBar: new SideNavBar(),
    Tasks: new Tasks(),
  },
  renderHierarchyConfig = {
    0: [classInstance.PageStructure],
    1: [classInstance.SideNavBar, classInstance.Tasks],
  },
  publisher = AppStatePublisher(),
  LSAS = localStorageAppState(),
  initializeTwoWaySubscriptions = () => {
    for (let module in classInstance) {
      const appModule = classInstance[module];
      publisher.subscribe(
        module,
        appModule.interface_sync_appstate.bind(appModule)
      );
      appModule.interface_subscribe_appstate(publisher.publish);
    }
  },
  appRender = () => {
    for (let key in renderHierarchyConfig) {
      renderHierarchyConfig[key].forEach((module) => module.interface_init());
    }
  },
  applyLocalStorageData = () => {
    publisher.subscribe("LSAS", LSAS.update.bind(LSAS));
    LSAS.initialize();

    const retrievedAppStateData = LSAS.emit();
    publisher.publish(retrievedAppStateData);
  },
  startApp = () => {
    initializeTwoWaySubscriptions();
    appRender();
    applyLocalStorageData();
  };

startApp();
