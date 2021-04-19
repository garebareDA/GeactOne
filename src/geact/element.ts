//とりあえずany 書き換えれそうだったらそうする

type element = {
  type:String,
  props:{
    nodeValue:any,
    children:Array<any>,
  }
}

function createElement(type:String, props:any, ...children:any): element {
  return {
    type,
    props: {
      ...props,
      children: children.map((child:any) => typeof child == "object" ? child : createTextElement(child)),
    },
  }
}

function createTextElement(text:any):element {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children:[],
    }
  }
}

export default createElement