import { element } from './element';

function render(elements: element, container: Text | HTMLElement) {
  const dom = elements.type == "TEXT_ELEMENT"
              ? document.createTextNode("")
              : document.createElement(elements.type.toString());
  elements.props.children.forEach((chiled: element) => {
    render(chiled, dom);
  });
  container.appendChild(dom);

  const isPropaty = (key:string) => key !== "children";
  Object.keys(elements.props).filter(isPropaty).forEach(name => {
    (dom as any)[name] = (elements.props as any)[name];
  });
}

export {
  render
}