import { render } from "@testing-library/react-native";
import React from "react";

import { FormContainer } from "../FormContainer";

describe("FormContainer", () => {
  it("renders correctly", () => {
    const tree = render(<FormContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
