import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  console.log(props);
  return (
    <div>
      <header>
        <h1>Expensify</h1>
        <NavLink activeClassName="is-active" exact={true} to="/">
          dashboard
        </NavLink>
        <NavLink activeClassName="is-active" to="/create">
          Create Expense
        </NavLink>
        <NavLink activeClassName="is-active" to="/edit">
          Edit Expense
        </NavLink>
        <NavLink activeClassName="is-active" to="/help">
          Help page
        </NavLink>
      </header>
    </div>
  );
};

export default Header;
