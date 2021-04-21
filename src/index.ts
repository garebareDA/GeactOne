import Geact from './geact/geact';
import Counter from './tsx/test';

const elements = Counter();

const container = document.getElementById("root");
if (container != null) {
  Geact.render(elements, container);
} else {
  console.error( "root" + "is not found");
}
