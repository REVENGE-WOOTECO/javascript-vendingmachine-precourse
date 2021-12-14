import createObjectStore from "./objectStore.js";
import { ACTION } from "./action.js";
import { product } from "../product.js";
const KEY = "product";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATE:
      if (state) {
        const oldData = state.filter(
          (data) => data.getId() !== action.payload.getId()
        );
        return oldData ? [...oldData, action.payload] : [action.payload];
      } else {
        return [action.payload];
      }
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
