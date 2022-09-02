import { render } from "@testing-library/react-native";
import React from "react";

import { LoadingScreen } from "../LoadingScreen";

describe("LoadingScreen", () => {
  it("renders correctly", () => {
    const tree = render(<LoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
