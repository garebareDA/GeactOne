type Fiber = {
  type: string,
  dom: Text | HTMLElement | null,
  pearent: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  props: {
    nodeValue: string,
    children: Array<Fiber>,
  }
}

let nextUnitOfWork: Fiber | null = null;
requestAnimationFrame(workLoop);

function render(elements: Fiber, container: Text | HTMLElement) {
  nextUnitOfWork = {
    type: "root",
    dom: container,
    pearent: null,
    child: null,
    sibling: null,
    props: {
      nodeValue: "",
      children: [elements],
    }
  }
}

function createDom(fiber: Fiber): Text | HTMLElement {
  const dom = fiber.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type.toString());
  fiber.props.children.forEach((chiled: Fiber) => {
    render(chiled, dom);
  });

  const isPropaty = (key: string) => key !== "children";
  Object.keys(fiber.props).filter(isPropaty).forEach(name => {
    (dom as any)[name] = (fiber.props as any)[name];
  });

  return dom;
}

function workLoop(time: any) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);

    var currentTime = new Date().getTime();
    shouldYield = (time - currentTime) < 1;
  }
  requestAnimationFrame(workLoop);
}

function preformUnitOfWork(fiber: Fiber): Fiber | null {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.pearent != null) {
    fiber.pearent.dom?.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling: Fiber | null = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber: Fiber = {
      type: element.type,
      props: element.props,
      pearent: fiber,
      child: null,
      dom: null,
      sibling: null,
    }

    prevSibling = newFiber;
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | null = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.pearent;
  }

  return null;
}

export {
  render
}

export type {
  Fiber
}