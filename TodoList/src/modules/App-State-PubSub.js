export function AppStatePublisher() {
  const subscribers = {
  };

  function subscribe(module, publisherSideEmitMethod) {
    subscribers[module] = publisherSideEmitMethod;
  }

  function unsubscribe(targetModule) {
    delete subscribers[targetModule];
  }

  function publish(appStateData) {
    for (let publisherSideEmitMethodKey in subscribers) {
      const method = subscribers[publisherSideEmitMethodKey]
      method(appStateData);
    }
  }

  return { subscribe, unsubscribe, publish };
}
