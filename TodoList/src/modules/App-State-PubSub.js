export function AppStatePublisher() {
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
    for (let appStatemethod of subscribers) {
      appStatemethod(appStateData);
    }
  }

  return { subscribe, unsubscribe, publish };
}
