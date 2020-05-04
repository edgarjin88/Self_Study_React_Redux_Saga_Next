import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};

/**
 *
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props = Copmponent props specific to this setup.
 * @param {any} state - Iniital state for setup
 * @returns {ShallowWrapper}
 *
 */

/**
 * Return ShallowWraper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper -Enzyme shalow wrapper to search within.
 * @param {string} val = value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`); // this is shallowwrapper
};

test("renders without error", () => {
  const wrapper = setup();

  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();

  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();

  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter displway", () => {
  const wrapper = setup();

  const appComponent = wrapper.find("[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});
