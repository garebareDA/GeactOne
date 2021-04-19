import Geact from './geact/geact';
import { element } from './geact/element';

const elements = Geact.createElement(
  "div",
  { id: "foo" },
  Geact.createElement("a", null, "bar"),
  Geact.createElement("b", null),
)

console.log(elements);

const container = document.getElementById("root");
if (container != null) {
  Geact.render(elements, container);
} else {
  console.error( "root" + "is not found");
}
