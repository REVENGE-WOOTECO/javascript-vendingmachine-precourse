const createStore = (key, reducer) => {
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
    const state = reducer(getState(key), action);
    setState(state);
    publish(action.type);
  };

  const getState = () => localStorage.getItem(key);
  const setState = (state) => localStorage.setItem(key, state);

  return {
    getState,
    subscribe,
    subscribeAll,
    dispatch,
    publish,
  };
};
export default createStore;

// function purchase(id) {
//   const products = getStorageDataById(PRODUCT_KEY, id);
//   if (products && products.purchase()) {
//     setState(PRODUCT_KEY, products);
//     setState(CHARGE_KEY, getStorageData(CHARGE_KEY) - products.price);
//   }
// }
