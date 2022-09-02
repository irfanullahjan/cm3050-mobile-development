import { render } from "@testing-library/react-native";
import { useField } from "formik";
import React from "react";

import { TextInput } from "../TextInput";

jest.mock("formik");

describe("TextInput", () => {
  it("renders", () => {
    useField.mockReturnValue([
      { value: "" },
      { error: "", touched: false },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const tree = render(<TextInput name="inputName" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with label", () => {
    useField.mockReturnValue([
      { value: "Input value" },
      { error: "Input error", touched: false },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const tree = render(
      <TextInput name="inputName" label="Test label" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with placeholder", () => {
    useField.mockReturnValue([
      { value: "test" },
      { error: "test", touched: true },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const tree = render(
      <TextInput name="test" placeholder="Test placeholder" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("doesn't show validation error when untouched", () => {
    useField.mockReturnValue([
      { value: "Some value" },
      { error: "required", touched: false },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const { getByText } = render(<TextInput name="test" />);
    expect(() => getByText("required")).toThrow();
  });
  it("shows validation error when touched", () => {
    useField.mockReturnValue([
      { value: "Some value" },
      { error: "required", touched: true },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const { getByText } = render(<TextInput name="test" />);
    expect(getByText("required")).toBeTruthy();
  });
});
