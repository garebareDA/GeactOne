"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geact_1 = require("./src/geact");
const element = geact_1.default.createElement("div", { id: "foo" }, geact_1.default.createElement("a", null, "bar"), geact_1.default.createElement("b", null));
console.log(element);
