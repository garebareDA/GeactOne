import Geact from './src/geact/geact';
import { element } from './src/geact/element';

const element = Geact.createElement(
  "div",
  { id: "foo" },
  Geact.createElement("a", null, "bar"),
  Geact.createElement("b", null),
)

console.log(element);
element.props.children.forEach((chiled: element) => {
  console.log(chiled);
  chiled.props.children.forEach((chiled: element) => {
    console.log(chiled);
  });
});

const container = document.getElementById("root");
if (container != null) {
  Geact.render(element, container);
} else {

}
