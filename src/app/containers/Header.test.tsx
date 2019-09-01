import {shallow} from "enzyme";
import * as React from "react";
import {ConnectedLink} from "react-router5";
import {UnconnectedHeader} from "./Header";

describe("<Header />", () => {
  it("contains links", () => {
    const wrapper = shallow(<UnconnectedHeader/>);
    expect(wrapper.containsMatchingElement(<ConnectedLink routeName="home">Home</ConnectedLink>)).toBeTruthy();
  });
});
