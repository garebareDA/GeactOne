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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction createElement(type, props, ...children) {\n  return {\n    dom: null,\n    parent: null,\n    child: null,\n    sibling: null,\n    type,\n    props: { ...props,\n      children: children.map(child => typeof child == \"object\" ? child : createTextElement(child))\n    },\n    alternate: null,\n    effectTag: \"\"\n  };\n}\n\nfunction createTextElement(text) {\n  return {\n    dom: null,\n    parent: null,\n    child: null,\n    sibling: null,\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: []\n    },\n    alternate: null,\n    effectTag: \"\"\n  };\n}\n\n\n\n//# sourceURL=webpack://geactone/./src/geact/element.ts?");

/***/ }),

/***/ "./src/geact/geact.ts":
/*!****************************!*\
  !*** ./src/geact/geact.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ \"./src/geact/element.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/geact/render.ts\");\n\n\nconst Geact = {\n  createElement: _element__WEBPACK_IMPORTED_MODULE_0__.createElement,\n  render: _render__WEBPACK_IMPORTED_MODULE_1__.render\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Geact);\n\n//# sourceURL=webpack://geactone/./src/geact/geact.ts?");

/***/ }),

/***/ "./src/geact/render.ts":
/*!*****************************!*\
  !*** ./src/geact/render.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\nlet nextUnitOfWork = null;\nlet wipRoot = null;\nlet currentRoot = null;\nlet deletions;\n\nconst isProperty = key => key !== \"children\" && !isEvent(key);\n\nconst isEvent = key => key.startsWith(\"on\");\n\nconst isNew = (prev, next) => key => prev[key] !== next[key];\n\nconst isGone = (prev, next) => key => !(key in next);\n\nrequestAnimationFrame(workLoop);\n\nfunction render(elements, container) {\n  wipRoot = {\n    type: \"root\",\n    dom: container,\n    parent: null,\n    child: null,\n    sibling: null,\n    props: {\n      nodeValue: \"\",\n      children: [elements]\n    },\n    alternate: currentRoot,\n    effectTag: \"\"\n  };\n  nextUnitOfWork = wipRoot;\n}\n\nfunction createDom(fiber) {\n  const dom = fiber.type == \"TEXT_ELEMENT\" ? document.createTextNode(\"\") : document.createElement(fiber.type.toString());\n  fiber.props.children.forEach(chiled => {\n    render(chiled, dom);\n  });\n\n  const isPropaty = key => key !== \"children\";\n\n  Object.keys(fiber.props).filter(isPropaty).forEach(name => {\n    dom[name] = fiber.props[name];\n  });\n  return dom;\n}\n\nfunction commitRoot() {\n  if (wipRoot) commitWork(wipRoot.child);\n  currentRoot = wipRoot;\n  wipRoot = null;\n}\n\nfunction commitWork(fiber) {\n  if (!fiber) return;\n  const domParent = fiber.parent?.dom;\n\n  if (fiber.effectTag === \"PLACEMENT\" && fiber.dom != null) {\n    domParent?.appendChild(fiber.dom);\n  } else if (fiber.effectTag === \"UPDATE\" && fiber.dom != null) {\n    if (fiber.alternate) updateDom(fiber.dom, fiber.alternate.props, fiber.props);else console.error(\"notfound fiber alnate\");\n  } else if (fiber.effectTag === \"DELETION\") {\n    if (fiber.dom) domParent?.removeChild(fiber.dom);else console.error(\"not found parent\");\n  }\n\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\nfunction updateDom(dom, prevProps, nextProps) {\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => {\n    dom[name] = \"\";\n  });\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => {\n    dom[name] = nextProps[name];\n  });\n  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)).forEach(name => {\n    const eventType = name.toLocaleLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  });\n}\n\nfunction workLoop(time) {\n  let shouldYield = false;\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);\n    var currentTime = new Date().getTime();\n    shouldYield = time - currentTime < 1;\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot();\n  }\n\n  requestAnimationFrame(workLoop);\n}\n\nfunction preformUnitOfWork(fiber) {\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  const elements = fiber.props.children;\n  reconcileChildren(fiber, elements);\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  let nextFiber = fiber;\n\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n\n    nextFiber = nextFiber.parent;\n  }\n\n  return null;\n}\n\nfunction reconcileChildren(wipFiber, elements) {\n  let index = 0;\n  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;\n  let prevSibling = null;\n\n  while (index < elements.length || oldFiber != null) {\n    const element = elements[index];\n    let newFiber = null;\n    const sameType = oldFiber && element && element.type == oldFiber.type;\n\n    if (sameType) {\n      if (!oldFiber) console.error(\"not found oldFiber\");else newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: \"UPDATE\",\n        child: null,\n        sibling: null\n      };\n    }\n\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: \"PLACEMENT\",\n        child: null,\n        sibling: null\n      };\n    }\n\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = \"DELETION\";\n      deletions.push(oldFiber);\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack://geactone/./src/geact/render.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _geact_geact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geact/geact */ \"./src/geact/geact.ts\");\n\nconst elements = _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"div\", {\n  id: \"foo\"\n}, _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"a\", null, \"bar\"), _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.createElement(\"b\", null));\nconst container = document.getElementById(\"root\");\n\nif (container != null) {\n  _geact_geact__WEBPACK_IMPORTED_MODULE_0__.default.render(elements, container);\n} else {\n  console.error(\"root\" + \"is not found\");\n}\n\n//# sourceURL=webpack://geactone/./src/index.ts?");

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