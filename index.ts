import Geact from './src/geact';

const element = Geact.createElement(
  "div",
  {id: "foo"},
  Geact.createElement("a", null, "bar"),
  Geact.createElement("b", null),
)

console.log(element);