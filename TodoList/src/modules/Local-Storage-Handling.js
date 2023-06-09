export function localStorageAppState() {
  function initialize() {
    if (!localStorage.getItem("AppState")) {
      const appStateTemplate = {
        selectedOption: "Inbox",
        existingProjects: [],
        todoInfo: [],
      };
      localStorage.setItem("AppState", JSON.stringify(appStateTemplate));
    }
  }

  function update(newAppState) {
    if (localStorage.getItem("AppState")) {
      localStorage.removeItem("AppState");
      localStorage.setItem("AppState", JSON.stringify(newAppState));
    }
  }

  function emit() {
    if (localStorage.getItem("AppState")) {
      const appStateRef = JSON.parse(localStorage.getItem("AppState")),
        appStateCopy = appStateRef;
      return appStateCopy;
    }
  }

  return { initialize, update, emit };
}
