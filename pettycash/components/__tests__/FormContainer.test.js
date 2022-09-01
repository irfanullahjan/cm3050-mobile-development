import React from "react";
import { render } from "react-native-testing-library";

import { FormContainer } from "../FormContainer";

describe("FormContainer", () => {
  it("renders correctly", () => {
    const tree = render(<FormContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
