/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/geact/element.ts":
/*!******************************!*\
  !*** ./src/geact/element.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction createElement(type, props, ...children) {\n  return {\n    dom: null,\n    parent: null,\n    child: null,\n    sibling: null,\n    type,\n    props: { ...props,\n      children: children.map(child => typeof child == \"object\" ? child : createTextElement(child))\n    },\n    alternate: null,\n    effectTag: \"\",\n    hooks: []\n  };\n}\n\nfunction createTextElement(text) {\n  return {\n    dom: null,\n    parent: null,\n    child: null,\n    sibling: null,\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: []\n    },\n    alternate: null,\n    effectTag: \"\",\n    hooks: []\n  };\n}\n\n\n\n//# sourceURL=webpack://geactone/./src/geact/element.ts?");

/***/ }),

/***/ "./src/geact/geact.ts":
/*!****************************!*\
  !*** ./src/geact/geact.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ \"./src/geact/element.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/geact/render.ts\");\n\n\nconst Geact = {\n  createElement: _element__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  render: _render__WEBPACK_IMPORTED_MODULE_1__.render,\n  useState: _render__WEBPACK_IMPORTED_MODULE_1__.useState\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Geact);\n\n//# sourceURL=webpack://geactone/./src/geact/geact.ts?");

/***/ }),

/***/ "./src/geact/render.ts":
/*!*****************************!*\
  !*** ./src/geact/render.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"useState\": () => (/* binding */ useState)\n/* harmony export */ });\nlet nextUnitOfWork = null;\nlet wipRoot = null;\nlet currentRoot = null;\nlet deletions;\nlet wipFiber = null;\nlet hookIndex = 0;\n\nconst isProperty = key => key !== \"children\" && !isEvent(key);\n\nconst isEvent = key => key.startsWith(\"on\");\n\nconst isNew = (prev, next) => key => prev[key] !== next[key];\n\nconst isGone = (prev, next) => key => !(key in next);\n\nrequestAnimationFrame(workLoop);\n\nfunction render(elements, container) {\n  wipRoot = {\n    type: \"root\",\n    dom: container,\n    parent: null,\n    child: null,\n    sibling: null,\n    props: {\n      nodeValue: \"\",\n      children: [elements]\n    },\n    alternate: currentRoot,\n    effectTag: \"\",\n    hooks: []\n  };\n  nextUnitOfWork = wipRoot;\n}\n\nfunction createDom(fiber) {\n  const dom = fiber.type == \"TEXT_ELEMENT\" ? document.createTextNode(\"\") : document.createElement(fiber.type.toString());\n  updateDom(dom, {\n    nodeValue: \"\",\n    children: []\n  }, fiber.props);\n  return dom;\n}\n\nfunction commitRoot() {\n  if (wipRoot) commitWork(wipRoot.child);\n  currentRoot = wipRoot;\n  wipRoot = null;\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) return;\n  let domParentFiber = fiber.parent;\n\n  while (!domParentFiber?.dom) {\n    domParentFiber = domParentFiber?.parent;\n  }\n\n  const domParent = domParentFiber.dom;\n\n  if (fiber.effectTag === \"PLACEMENT\" && fiber.dom != null) {\n    domParent?.appendChild(fiber.dom);\n  } else if (fiber.effectTag === \"UPDATE\" && fiber.dom != null) {\n    if (fiber.alternate) updateDom(fiber.dom, fiber.alternate.props, fiber.props);else console.error(\"notfound fiber alnate\");\n  } else if (fiber.effectTag === \"DELETION\") {\n    if (fiber.dom) domParent?.removeChild(fiber.dom);else console.error(\"not found parent\");\n  }\n\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\nfunction updateDom(dom, prevProps, nextProps) {\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => {\n    dom[name] = \"\";\n  });\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => {\n    dom[name] = nextProps[name];\n  });\n  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => {\n    const eventType = name.toLocaleLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  });\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {\n    const eventType = name.toLowerCase().substring(2);\n    dom.addEventListener(eventType, nextProps[name]);\n  });\n}\n\nfunction workLoop(time) {\n  let shouldYield = false;\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);\n    var currentTime = new Date().getTime();\n    shouldYield = time - currentTime < 1;\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot();\n  }\n\n  requestAnimationFrame(workLoop);\n}\n\nfunction preformUnitOfWork(fiber) {\n  const isFunctionCommponent = fiber.type instanceof Function;\n\n  if (isFunctionCommponent) {\n    updateFunctionComponent(fiber);\n  } else {\n    updateHostComponent(fiber);\n  }\n\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  const elements = fiber.props.children;\n  reconcileChildren(fiber, elements);\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  let nextFiber = fiber;\n\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n\n    nextFiber = nextFiber.parent;\n  }\n\n  return null;\n}\n\nfunction updateFunctionComponent(fiber) {\n  wipFiber = fiber;\n  hookIndex = 0;\n  wipFiber.hooks = [];\n  const children = [fiber.type(fiber.props)];\n  reconcileChildren(fiber, children);\n}\n\nfunction updateHostComponent(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  reconcileChildren(fiber, fiber.props.children);\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0;\n  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;\n  let prevSibling = null;\n\n  while (index < elements.length || oldFiber != null) {\n    const element = elements[index];\n    let newFiber = null;\n    const sameType = oldFiber && element && element.type == oldFiber.type;\n\n    if (sameType) {\n      if (!oldFiber) console.error(\"not found oldFiber\");else newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: \"UPDATE\",\n        child: null,\n        sibling: null,\n        hooks: []\n      };\n    }\n\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: \"PLACEMENT\",\n        child: null,\n        sibling: null,\n        hooks: []\n      };\n    }\n\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = \"DELETION\";\n      deletions.push(oldFiber);\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n\n    prevSibling = newFiber;\n\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else if (element) {\n      if (prevSibling) prevSibling.sibling = newFiber;else console.error(\"prevSibling not found\");\n    }\n\n    index++;\n  }\n}\n\nfunction useState(inital) {\n  const oldHook = wipFiber?.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];\n  const hook = {\n    state: oldHook ? oldHook.state : inital,\n    queue: []\n  };\n  const actions = oldHook ? oldHook.queue : [];\n  actions.forEach(action => {\n    hook.state = action(hook.state);\n  });\n\n  const setState = action => {\n    hook.queue.filter(action);\n    if (currentRoot) wipRoot = {\n      dom: currentRoot.dom,\n      type: \"\",\n      props: currentRoot.props,\n      alternate: currentRoot,\n      parent: null,\n      effectTag: \"\",\n      child: null,\n      sibling: null,\n      hooks: []\n    };else console.error(\"not found current root\");\n    nextUnitOfWork = wipRoot;\n    deletions = [];\n  };\n\n  wipFiber?.hooks.push(hook);\n  hookIndex++;\n  return [hook.state, setState];\n}\n\n\n\n//# sourceURL=webpack://geactone/./src/geact/render.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _geact_geact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geact/geact */ \"./src/geact/geact.ts\");\n/* harmony import */ var _tsx_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tsx/test */ \"./src/tsx/test.jsx\");\n/* harmony import */ var _tsx_test__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tsx_test__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst elements = _tsx_test__WEBPACK_IMPORTED_MODULE_1___default()();\nconst container = document.getElementById(\"root\");\n\nif (container != null) {\n  _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.render(elements, container);\n} else {\n  console.error(\"root\" + \"is not found\");\n}\n\n//# sourceURL=webpack://geactone/./src/index.ts?");

/***/ }),

/***/ "./src/tsx/test.jsx":
/*!**************************!*\
  !*** ./src/tsx/test.jsx ***!
  \**************************/
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /home/garebare/GeactOne/src/tsx/test.jsx: Support for the experimental syntax 'jsx' isn't currently enabled (7:10):\\n\\n\\u001b[0m \\u001b[90m  5 |\\u001b[39m \\u001b[36mfunction\\u001b[39m \\u001b[33mCounter\\u001b[39m() {\\u001b[0m\\n\\u001b[0m \\u001b[90m  6 |\\u001b[39m   \\u001b[36mconst\\u001b[39m [state\\u001b[33m,\\u001b[39m setState] \\u001b[33m=\\u001b[39m \\u001b[33mGeact\\u001b[39m\\u001b[33m.\\u001b[39museState(\\u001b[35m1\\u001b[39m)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m  7 |\\u001b[39m   \\u001b[36mreturn\\u001b[39m \\u001b[33m<\\u001b[39m\\u001b[33mh1\\u001b[39m onClick\\u001b[33m=\\u001b[39m{() \\u001b[33m=>\\u001b[39m setState((c) \\u001b[33m=>\\u001b[39m c \\u001b[33m+\\u001b[39m \\u001b[35m1\\u001b[39m)}\\u001b[33m>\\u001b[39m\\u001b[33mCount\\u001b[39m\\u001b[33m:\\u001b[39m {state}\\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mh1\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    |\\u001b[39m          \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m  8 |\\u001b[39m }\\u001b[0m\\n\\u001b[0m \\u001b[90m  9 |\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 |\\u001b[39m \\u001b[36mexport\\u001b[39m \\u001b[36mdefault\\u001b[39m \\u001b[33mCounter\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\nAdd @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.\\nIf you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.\\n    at Parser._raise (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:776:17)\\n    at Parser.raiseWithData (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:769:17)\\n    at Parser.expectOnePlugin (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:9750:18)\\n    at Parser.parseExprAtom (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:11125:22)\\n    at Parser.parseExprSubscripts (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:10708:23)\\n    at Parser.parseUpdate (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:10688:21)\\n    at Parser.parseMaybeUnary (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:10666:23)\\n    at Parser.parseExprOps (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:10523:23)\\n    at Parser.parseMaybeConditional (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:10497:23)\\n    at Parser.parseMaybeAssign (/home/garebare/GeactOne/node_modules/@babel/parser/lib/index.js:10460:21)\");\n\n//# sourceURL=webpack://geactone/./src/tsx/test.jsx?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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