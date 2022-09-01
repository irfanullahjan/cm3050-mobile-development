import React from "react";
import { render } from "react-native-testing-library";

import { LoadingScreen } from "../LoadingScreen";

describe("LoadingScreen", () => {
  it("renders correctly", () => {
    const tree = render(<LoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
