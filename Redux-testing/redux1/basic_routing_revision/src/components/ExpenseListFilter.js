import React from "react";

import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount } from "../actions/filters";
const ExpenseListFilters = props => {
  return (
    <div>
      <input
        type="text"
        defaultValue={props.filters.text}
        onChange={e => {
          console.log(e.target.value);
          props.dispatch(setTextFilter(e.target.value));
        }}
      />
      <select
        value={props.filters.sortByDate}
        onChange={e => {
          console.log("value :", e.target.value);
          if (e.target.value === "date") {
            console.log("date fired");

            props.dispatch(sortByDate());
          } else if (e.target.value === "amount") {
            console.log("amount fired");
            props.dispatch(sortByAmount());
          }
          props.dispatch(setTextFilter(e.target.value));
        }}
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
