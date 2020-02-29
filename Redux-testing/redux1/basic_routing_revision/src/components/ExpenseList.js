import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";

import selectExpenses from "../selectors/expenses";
const ExpenseLsit = props => {
  return (
    <div>
      <h1>Expense List</h1>
      {props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} /> // descturcuting the contents.
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  console.log("whole states :", state);
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseLsit);
