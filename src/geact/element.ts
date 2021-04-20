import { Fiber } from './render';

function createElement(type: string, props: any, ...children: any): Fiber {
  return {
    dom: null,
    pearent: null,
    child: null,
    sibling: null,
    type,
    props: {
      ...props,
      children: children.map((child: Fiber) => typeof child == "object" ? child : createTextElement(child)),
    },
    nextUnitOfWork:null,
  }
}

function createTextElement(text: string): Fiber {
  return {
    dom: null,
    pearent: null,
    child: null,
    sibling: null,
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
    nextUnitOfWork:null,
  }
}

export {
  createElement
}