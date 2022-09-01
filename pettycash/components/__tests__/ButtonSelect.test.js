import { useField } from "formik";
import React from "react";
import { fireEvent, render } from "react-native-testing-library";

import { ButtonSelect } from "../ButtonSelect";

jest.mock("formik");

describe("ButtonSelect", () => {
  it("renders", () => {
    useField.mockReturnValue([
      { value: "test" },
      { error: "", touched: false },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const tree = render(
      <ButtonSelect
        name="test"
        options={[
          { label: "test", value: "test" },
          { label: "test2", value: "test2" },
        ]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("selects correct option", () => {
    const setValueHelper = jest.fn();
    useField.mockReturnValue([
      { value: "test" },
      { error: "", touched: false },
      { setValue: setValueHelper, setTouched: jest.fn() },
    ]);
    const { getByText } = render(
      <ButtonSelect
        name="test"
        options={[
          { label: "test", value: "test" },
          { label: "test2", value: "test2" },
        ]}
      />
    );
    fireEvent.press(getByText("test2"));
    expect(setValueHelper).toHaveBeenCalledWith("test2");
  });
});
