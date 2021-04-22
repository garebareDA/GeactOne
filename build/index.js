/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/geact/element.ts":
/*!******************************!*\
  !*** ./src/geact/element.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction createElement(type, props, ...children) {\n  return {\n    dom: null,\n    parent: null,\n    child: null,\n    sibling: null,\n    type,\n    props: { ...props,\n      children: children.map(child => typeof child == \"object\" ? child : createTextElement(child))\n    },\n    alternate: null,\n    effectTag: \"\",\n    hooks: []\n  };\n}\n\nfunction createTextElement(text) {\n  return {\n    dom: null,\n    parent: null,\n    child: null,\n    sibling: null,\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: []\n    },\n    alternate: null,\n    effectTag: \"\",\n    hooks: []\n  };\n}\n\n\n\n//# sourceURL=webpack://geactone/./src/geact/element.ts?");

/***/ }),

/***/ "./src/geact/geact.ts":
/*!****************************!*\
  !*** ./src/geact/geact.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ \"./src/geact/element.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/geact/render.ts\");\n\n\nconst Geact = {\n  createElement: _element__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  render: _render__WEBPACK_IMPORTED_MODULE_1__.render,\n  useState: _render__WEBPACK_IMPORTED_MODULE_1__.useState\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Geact);\n\n//# sourceURL=webpack://geactone/./src/geact/geact.ts?");

/***/ }),

/***/ "./src/geact/render.ts":
/*!*****************************!*\
  !*** ./src/geact/render.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"useState\": () => (/* binding */ useState)\n/* harmony export */ });\nlet nextUnitOfWork = null;\nlet wipRoot = null;\nlet currentRoot = null;\nlet deletions;\nlet wipFiber = null;\nlet hookIndex = 0;\n\nconst isProperty = key => key !== \"children\" && !isEvent(key);\n\nconst isEvent = key => key.startsWith(\"on\");\n\nconst isNew = (prev, next) => key => prev[key] !== next[key];\n\nconst isGone = (prev, next) => key => {\n  !(key in next);\n};\n\nrequestAnimationFrame(workLoop);\n\nfunction render(elements, container) {\n  wipRoot = {\n    type: \"\",\n    dom: container,\n    parent: null,\n    child: null,\n    sibling: null,\n    props: {\n      nodeValue: \"\",\n      children: [elements]\n    },\n    alternate: currentRoot,\n    effectTag: \"\",\n    hooks: []\n  };\n  deletions = [];\n  nextUnitOfWork = wipRoot;\n}\n\nfunction createDom(fiber) {\n  const dom = fiber.type == \"TEXT_ELEMENT\" ? document.createTextNode(\"\") : document.createElement(fiber.type);\n  updateDom(dom, {\n    nodeValue: \"\",\n    children: []\n  }, fiber.props);\n  return dom;\n}\n\nfunction commitRoot() {\n  deletions.forEach(commitWork);\n  if (wipRoot) commitWork(wipRoot.child);else console.error(\"not found wipRoot\");\n  currentRoot = wipRoot;\n  wipRoot = null;\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) return;\n  let domParentFiber = fiber.parent;\n\n  while (!domParentFiber?.dom) {\n    domParentFiber = domParentFiber?.parent;\n  }\n\n  const domParent = domParentFiber.dom;\n\n  if (fiber.effectTag === \"PLACEMENT\" && fiber.dom != null) {\n    domParent?.appendChild(fiber.dom);\n  } else if (fiber.effectTag === \"UPDATE\" && fiber.dom != null) {\n    if (fiber.alternate) updateDom(fiber.dom, fiber.alternate.props, fiber.props);else console.error(\"notfound fiber alnate\");\n  } else if (fiber.effectTag === \"DELETION\") {\n    if (fiber.dom) commitDeletion(fiber, domParent);else console.error(\"not found parent\");\n  }\n\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\nfunction updateDom(dom, prevProps, nextProps) {\n  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => {\n    const eventType = name.toLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  });\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => {\n    dom[name] = \"\";\n  });\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => {\n    dom[name] = nextProps[name];\n  });\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {\n    const eventType = name.toLowerCase().substring(2);\n    dom.addEventListener(eventType, nextProps[name]);\n  });\n}\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom);\n  } else {\n    if (fiber.child) commitDeletion(fiber.child, domParent);\n  }\n}\n\nfunction workLoop(time) {\n  let shouldYield = false;\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);\n    const currentTime = new Date().getTime();\n    shouldYield = time - currentTime < 1;\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot();\n  }\n\n  requestAnimationFrame(workLoop);\n}\n\nfunction performUnitOfWork(fiber) {\n  const isFunctionCommponent = fiber.type instanceof Function;\n\n  if (isFunctionCommponent) {\n    updateFunctionComponent(fiber);\n  } else {\n    updateHostComponent(fiber);\n  }\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  let nextFiber = fiber;\n\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n\n    nextFiber = nextFiber.parent;\n  }\n\n  return null;\n}\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber;\n  hookIndex = 0;\n  wipFiber.hooks = [];\n  const children = [fiber.type(fiber.props)];\n  reconcileChildren(fiber, children);\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  reconcileChildren(fiber, fiber.props.children);\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0;\n  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;\n  let prevSibling = null;\n\n  while (index < elements.length || oldFiber != null) {\n    const element = elements[index];\n    let newFiber = null; //nodeValueの中身は入っているが生成されていない\n\n    const sameType = oldFiber && element && element.type == oldFiber.type;\n\n    if (sameType) {\n      if (!oldFiber) console.error(\"not found oldFiber\");else newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: \"UPDATE\",\n        child: null,\n        sibling: null,\n        hooks: []\n      };\n    }\n\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: \"PLACEMENT\",\n        child: null,\n        sibling: null,\n        hooks: []\n      };\n    }\n\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = \"DELETION\";\n      deletions.push(oldFiber);\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else if (element) {\n      if (prevSibling) prevSibling.sibling = newFiber;else console.error(\"prevSibling not found\");\n    }\n\n    prevSibling = newFiber;\n    index++;\n  }\n}\n\nfunction useState(inital) {\n  const oldHook = wipFiber?.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];\n  const hook = {\n    state: oldHook ? oldHook.state : inital,\n    queue: []\n  };\n  const actions = oldHook ? oldHook.queue : [];\n  actions.forEach(action => {\n    hook.state = action(hook.state);\n  });\n\n  const setState = action => {\n    hook.queue.push(action);\n    if (currentRoot) wipRoot = {\n      dom: currentRoot.dom,\n      type: \"\",\n      props: currentRoot.props,\n      alternate: currentRoot,\n      parent: null,\n      effectTag: \"\",\n      child: null,\n      sibling: null,\n      hooks: []\n    };else console.error(\"not found current root\");\n    nextUnitOfWork = wipRoot;\n    deletions = [];\n  };\n\n  wipFiber?.hooks.push(hook);\n  hookIndex++;\n  return [hook.state, setState];\n}\n\n\n\n//# sourceURL=webpack://geactone/./src/geact/render.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tsx_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tsx/test */ \"./src/tsx/test.jsx\");\n\n(0,_tsx_test__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n//# sourceURL=webpack://geactone/./src/index.ts?");

/***/ }),

/***/ "./src/tsx/test.jsx":
/*!**************************!*\
  !*** ./src/tsx/test.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _geact_geact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geact/geact */ \"./src/geact/geact.ts\");\n\n/** @jsx Geact.createElement */\n\nfunction Counter() {\n  const [state, setState] = _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.useState(1);\n  return _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"h1\", {\n    onClick: () => {\n      setState(c => c + 1);\n      console.log(state);\n    }\n  }, \"Count: \", state);\n}\n\nfunction render() {\n  const elements = _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Counter, null);\n  console.log();\n  const container = document.getElementById(\"root\");\n\n  if (container != null) {\n    _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.render(elements, container);\n  } else {\n    console.error(\"root\" + \"is not found\");\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);\n\n//# sourceURL=webpack://geactone/./src/tsx/test.jsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;