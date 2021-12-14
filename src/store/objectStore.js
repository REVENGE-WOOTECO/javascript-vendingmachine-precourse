const createObjectStore = (key, generic, reducer) => {
  // generic = new class() 객체 생성하여 반환
  const events = {};

  const subscribe = (actionType, eventCallback) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eventCallback);
  };

  const subscribeAll = (actionType = [], eventCallback) => {
    for (const type of actionType) {
      subscribe(type, eventCallback);
    }
  };

  const publish = (actionType) => {
    if (!events[actionType]) {
      return;
    }
    events[actionType].map((event) => event());
  };

  const dispatch = (action) => {
    // action = {type(이벤트), payload(데이터)}
    const state = reducer(getState(), action);
    setState(state);
    publish(action.type);
  };

  const getState = () => {
    const getData = JSON.parse(localStorage.getItem(key));
    return getData ? getData.map((data) => generic(data)) : [];
  };

  const setState = (state) => {
    localStorage.setItem(key, JSON.stringify(state));
  };

  return {
    getState,
    subscribe,
    subscribeAll,
    dispatch,
    publish,
  };
};
export default createObjectStore;
