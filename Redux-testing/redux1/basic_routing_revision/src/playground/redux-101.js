import { createStore } from "redux";

// const incrementCount = ({ incrementBy = 1 } = {}) => {
//   return {
//     type: "INCREMENT",
//     incrementBy: incrementBy
//   };
// };

const decrementCount = ({ decrementBy = 1 } = {}) => {
  return {
    type: "DECREMENT",
    decrementBy
  };
};

const countReducer = (state = { count: 0 }, action) => {
  // console.log("running");
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
console.log("store: ", store);
//returns current state object
// unsubscribe(); // this means it is a high order function that returns sunsubscirbe function

store.dispatch({
  type: "INCREMENT",
  incrementBy: 5
});

store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });

store.dispatch(decrementCount({ decrementBy: 10 }));
// store.dispatch(decrementCount());

// console.log("this is store :", store.getState());
