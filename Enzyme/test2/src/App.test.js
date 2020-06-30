import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { render } from "@testing-library/react";
import App from "./App";
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for App
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 * **/
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />); //shallow search
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

/**
 *
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shalow wrapper to search within.
 *
 * @param {string} val - Value of data-test attribute for search -
 * @returns {ShallowWrapper}
 * **/

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
test("render without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  // expect(appComponent.length).toBe(1);
});
