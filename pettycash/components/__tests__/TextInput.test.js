import { useField } from "formik";
import React from "react";
import { render } from "react-native-testing-library";

import { TextInput } from "../TextInput";

jest.mock("formik");

describe("TextInput", () => {
  it("renders correctly", () => {
    useField.mockReturnValue([
      { value: "test" },
      { error: "test", touched: true },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const tree = render(<TextInput name="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
