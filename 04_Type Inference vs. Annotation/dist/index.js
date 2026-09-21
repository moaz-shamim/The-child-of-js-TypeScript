"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let drink = "chai";
let cups = Math.random() > 0.5 ? 10 : "moaz";
let airlineSeat = "window";
const orders = ["10", "20", "30", "40", "50"];
let currentOrder;
for (let order of orders) {
    if (order === "28") {
        currentOrder = order;
        break;
    }
}
// currentOrder = "popo";
console.log(currentOrder);
function serveChai(msg) {
    if (msg) {
        return `Serving ${msg}`;
    }
    return `Serving Default Masala chai`;
}
//# sourceMappingURL=index.js.map