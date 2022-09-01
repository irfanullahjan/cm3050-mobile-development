import { useField } from "formik";
import React from "react";
import { render } from "react-native-testing-library";

import { ButtonSelect } from "../ButtonSelect";

jest.mock("formik");

describe("ButtonSelect", () => {
  it("renders correctly", () => {
    useField.mockReturnValue([
      { value: "test" },
      { error: "test", touched: true },
      { setValue: jest.fn(), setTouched: jest.fn() },
    ]);
    const tree = render(
      <ButtonSelect name="test" options={[{ label: "test", value: "test" }]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
