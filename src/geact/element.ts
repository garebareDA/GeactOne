//とりあえずany 書き換えれそうだったらそうする
type element = {
  type:String,
  props:{
    nodeValue:string,
    children:Array<any>,
  }
}

function createElement(type:String, props:any, ...children:any): element {
  return {
    type,
    props: {
      ...props,
      children: children.map((child:element) => typeof child == "object" ? child : createTextElement(child)),
    },
  }
}

function createTextElement(text:string):element {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children:[],
    }
  }
}

export {
  createElement
}

export type {
  element
}