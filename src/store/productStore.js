import createObjectStore from "./objectStore.js";
import { ACTION } from "./action.js";
import { product } from "../product.js";
const KEY = "product";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATE:
      const oldData = state.find(
        (data) => data.getId() === action.payload.getId()
      );
      const rest = state.filter(
        (data) => data.getId() !== action.payload.getId()
      );
      if (oldData) {
        oldData.add(action.payload);
        return [...rest, oldData];
      }
      return [...state, action.payload];
    case ACTION.PURCHASE:
      const target = state.find((data) => data.getId() === action.payload);
      if (target && target.purchase()) {
        return reducer(state, { type: ACTION.UPDATE, payload: target });
      }
      return state;
    default:
      return state;
  }
};

const productStore = createObjectStore(
  KEY,
  ({ name, price, quantity }) => {
    return new product(name, price, quantity);
  },
  reducer
);
export default productStore;
