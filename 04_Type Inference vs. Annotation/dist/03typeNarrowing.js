"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getChai(kind) {
    if (typeof kind === "string") {
        return `Making ${kind} chai...`;
    }
    return `Chai oder: ${kind}`;
}
function serveChai(msg) {
    if (msg) {
        return `Serving ${msg}`;
    }
    return `Serving Default Massala Chai`;
}
let myImpossibleValue;
// myImpossibleValue = "moaz";
// If I try to assign any value to variable that has type never then typeScriot throws an error 'Type '"moaz"' is not assignable to type 'never''
class KulhadChai {
    serve() {
        return `Serving Kulhad Chai`;
    }
}
class Cutting {
    serve() {
        return `Serving Cutting Chai`;
    }
}
function serve(chai) {
    if (chai instanceof KulhadChai) {
        return chai.serve();
    }
}
const chai = new KulhadChai();
console.log(serve(chai));
function MakeChai(order) {
    switch (order.flavour) {
        case "Masala":
            return `Masala chai`;
            break;
        case "Elaichi":
            return `elaichi chai`;
            break;
        case "Ginger":
            return `ginger chai`;
            break;
    }
}
// Check If property Exist or not:
function brew(order) {
    if ("spiceLevel" in order) {
        // do something
    }
}
//# sourceMappingURL=03typeNarrowing.js.map