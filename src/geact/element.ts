import { Fiber } from './render';

function createElement(type: string, props: any, ...children: any): Fiber {
  return {
    dom: null,
    parent: null,
    child: null,
    sibling: null,
    type,
    props: {
      ...props,
      children: children.map((child: Fiber) => typeof child == "object" ? child : createTextElement(child)),
    },
    alternate:null,
    effectTag:"",
    hooks:[]
  }
}

function createTextElement(text: string): Fiber {
  return {
    dom: null,
    parent: null,
    child: null,
    sibling: null,
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
    alternate:null,
    effectTag:"",
    hooks:[],
  }
}

export {
  createElement
}