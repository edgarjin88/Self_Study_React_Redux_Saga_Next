import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

const now = moment();

console.log(now.format("MMM Do, YYYY"));
class ExpenseForm extends React.Component {
  state = {
    description: "",
    note: "",
    amount: "",
    createdAt: moment(),
    calendarFocused: false,
    error: ""
  };
  onDescriptionChange = e => {
    const description = e.target.value;
    console.log("desc :", description);
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    // const note = e.target.value;
    // console.log("note :", note);
    e.persist();
    this.setState(() => ({ note: e.target.value }));
  };
  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      // !amount to allow use to clear value
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      // set error.
      this.setState(() => ({ error: "Please enter required values" }));
    } else {
      this.setState(() => ({ error: "" }));
      console.log("submitted");
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.error}
          <input
            onChange={this.onDescriptionChange}
            value={this.state.description}
            type="text"
            placeholder="Description"
            autoFocus
          />
          <input
            onChange={this.onAmountChange}
            value={this.state.amount}
            type="number"
            placeholder="Amount"
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            id="your_unique_id"
            numberOfMonths={1}
            isOutsideRange={() => false}
          />

          {/* <SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
          /> */}

          <textarea
            onChange={this.onNoteChange}
            value={this.state.note}
            placeholder="add a note for your expense (optional)"
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
