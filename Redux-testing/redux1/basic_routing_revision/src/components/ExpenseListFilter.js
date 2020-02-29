import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import React from "react";

// const filtersReducerDefaultState = {
//   text: "",
//   sortBy: "date",
//   startDate: moment().startOf("month"),
//   endDate: moment().endOf("month")
// };
import { connect } from "react-redux";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filters";
// import { v1 as uuid } from "uuid";

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    //startDate, endDate are returned from react-dates, and they are moment objects

    console.log("start date :", startDate);
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };
  render() {
    return (
      <div>
        <input
          type="text"
          defaultValue={this.props.filters.text}
          onChange={e => {
            console.log(e.target.value);
            this.props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <select
          value={this.props.filters.sortByDate}
          onChange={e => {
            console.log("value :", e.target.value);
            if (e.target.value === "date") {
              console.log("date fired");

              this.props.dispatch(sortByDate());
            } else if (e.target.value === "amount") {
              console.log("amount fired");
              this.props.dispatch(sortByAmount());
            }
            this.props.dispatch(setTextFilter(e.target.value));
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          // startDate={moment('2020-03-01T01:00:00.000Z')}
          startDate={moment(this.props.filters.startDate)}
          startDateId={"start"}
          // endDate={moment('2020-03-01T01:00:00.000Z')}
          endDate={moment(this.props.filters.endDate)}
          endDateId={"end"}
          onDatesChange={this.onDatesChange}
          // returns moment object
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("filters: :", state.filters);
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
