function AppStatePublisher() {
  const subscribers = {
    "subscriber module": "app state sync method for specific module",
  };
  function subscribe(module, appStateMethod) {
    subscribers[module] = appStateMethod;
  }
  function unsubscribe(targetModule) {
    delete subscribers[targetModule];
  }
  function publish(appStateData) {
    for(let appStatemethod of subscribers) {
        appStatemethod(appStateData)
    }
  }
  function interface_publisher(command, data) {
    const { moduleString, method, appStateData } = data;
    switch (command) {
      case "subscribe":
        subscribe(moduleString, method);
        break;
      case "unsubscribe":
        unsubscribe(moduleString);
        break;
      case "publish":
        publish(appStateData);
        break;
      default:
        throw new Error("ERROR: Not a valid publisher command");
    }
  }
  return { interface_publisher };
}
