import React from "react";
import { Link } from "react-router-dom";
import ExpenseLsit from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilter";

const ExpenseDashboardPage = props => {
  console.log(props);
  return (
    <div>
      <ExpenseListFilters />
      <ExpenseLsit />
    </div>
  );
};

export default ExpenseDashboardPage;
