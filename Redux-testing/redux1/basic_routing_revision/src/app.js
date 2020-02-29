import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import configureStore from "./store/configureStore";
import AppRouter from "./routers/AppRouter";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";

import getVisibleExpense from "./selectors/expenses";

const store = configureStore();

store.dispatch(
  addExpense({ description: "Water bill", createdAt: 1034, amount: 3000 })
);
store.dispatch(
  addExpense({ description: "Rent", createdAt: 100, amount: 30004 })
);
store.dispatch(addExpense({ description: "Rent", amount: 2343 }));
store.dispatch(
  addExpense({ description: "Gast bill", createdAt: 1000, amount: 204449 })
);

const state = store.getState();
const visibleExpense = getVisibleExpense(state.expenses, state.filters);

const JSX = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(<JSX />, document.getElementById("app"));
