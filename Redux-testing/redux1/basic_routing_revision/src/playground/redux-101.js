import { createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  // console.log("running");
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        count: state.count - 1
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
console.log("store: ", store);
//returns current state object
unsubscribe(); // this means it is a high order function that returns sunsubscirbe function

store.dispatch({ type: "INCREMENT" });

store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });
// console.log("this is store :", store.getState());
