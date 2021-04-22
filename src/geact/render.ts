type Fiber = {
  type: string | any,
  dom: Text | HTMLElement | null,
  parent: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  props: Props,
  alternate: Fiber | null,
  effectTag: string,
  hooks: Array<any>,
}

type Props = {
  nodeValue: string,
  children: Array<Fiber>,
}

let nextUnitOfWork: Fiber | null = null;
let wipRoot: Fiber | null = null;
let currentRoot: Fiber | null = null;
let deletions: Fiber[];

let wipFiber: Fiber | null = null;
let hookIndex: number = 0;

const isProperty = (key: string) => key !== "children" && !isEvent(key)
const isEvent = (key: string) => key.startsWith("on")
const isNew = (prev: any, next: any) => (key: any) => prev[key] as any !== next[key];
const isGone = (prev: Props, next: Props) => (key: string) => {
  !(key in next)
};

requestAnimationFrame(workLoop);

function render(elements: Fiber, container: Text | HTMLElement) {
  wipRoot = {
    type: "",
    dom: container,
    parent: null,
    child: null,
    sibling: null,
    props: {
      nodeValue: "",
      children: [elements],
    },
    alternate: currentRoot,
    effectTag: "",
    hooks: [],
  }
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function createDom(fiber: Fiber): Text | HTMLElement {
  const dom = fiber.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type);
  updateDom(dom, {
    nodeValue: "",
    children: [],
  }, fiber.props);
  return dom;
}

function commitRoot() {
  deletions.forEach(commitWork);
  if (wipRoot) commitWork(wipRoot.child);
  else console.error("not found wipRoot");
  currentRoot = wipRoot
  wipRoot = null;
}

function commitWork(fiber: Fiber | null) {
  if (!fiber) return;
  let domParentFiber: Fiber | null | undefined = fiber.parent;
  while (!domParentFiber?.dom) { domParentFiber = domParentFiber?.parent }
  const domParent = domParentFiber.dom

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent?.appendChild(fiber.dom)
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    if (fiber.alternate) updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    else console.error("notfound fiber alnate");
  } else if (fiber.effectTag === "DELETION") {
    if (fiber.dom) commitDeletion(fiber, domParent);
    else console.error("not found parent");
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function updateDom(dom: Text | HTMLElement, prevProps: Props, nextProps: Props) {
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        (prevProps as any)[name]
      )
    })

  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      (dom as any)[name] = ""
    })

  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      (dom as any)[name] = (nextProps as any)[name]
    })

  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        (nextProps as any)[name]
      )
    })
}

function commitDeletion(fiber: Fiber, domParent: Text | HTMLElement) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    if (fiber.child)
      commitDeletion(fiber.child, domParent)
  }
}

function workLoop(time: any) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    const currentTime = new Date().getTime();
    shouldYield = (time - currentTime) < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestAnimationFrame(workLoop);
}

function performUnitOfWork(fiber: Fiber): Fiber | null {
  const isFunctionCommponent = fiber.type instanceof Function
  if (isFunctionCommponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | null = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}

function updateFunctionComponent(fiber: Fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber: Fiber, elements: Fiber[]) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber: Fiber | null = null;
    //nodeValueの中身は入っているが生成されていない

    const sameType = oldFiber && element && element.type == oldFiber.type;

    if (sameType) {
      if (!oldFiber) console.error("not found oldFiber");
      else
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          parent: wipFiber,
          alternate: oldFiber,
          effectTag: "UPDATE",
          child: null,
          sibling: null,
          hooks: [],
        }
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
        child: null,
        sibling: null,
        hooks: [],
      }
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element) {
      if (prevSibling) prevSibling.sibling = newFiber
      else console.error("prevSibling not found");
    }
    prevSibling = newFiber;
    index++
  }
}

function useState(inital: any): Array<any> {
  const oldHook =
    wipFiber?.alternate
    && wipFiber.alternate.hooks
    && wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : inital,
    queue: [],
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach((action: (state: any) => {}) => {
    hook.state = action(hook.state)
  })

  const setState = (action: never) => {
    hook.queue.push(action);
    if (currentRoot)
      wipRoot = {
        dom: currentRoot.dom,
        type: "",
        props: currentRoot.props,
        alternate: currentRoot,
        parent: null,
        effectTag: "",
        child: null,
        sibling: null,
        hooks: [],
      }
    else console.error("not found current root");

    nextUnitOfWork = wipRoot;
    deletions = [];
  }

  wipFiber?.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

export {
  render,
  useState,
}

export type {
  Fiber
}