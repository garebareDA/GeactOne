import createElement from './element';

const Geact = {
  createElement
}

const element = Geact.createElement(
  "div",
  {id: "foo"},
  Geact.createElement("a", null, "bar"),
  Geact.createElement("b", null),
)