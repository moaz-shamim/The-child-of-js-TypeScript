"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let response = "42";
// Type Asertion
let numericLength = response.length;
let bookString = `{"name":"who move my cheese"}`;
let bookObject = JSON.parse(bookString);
console.log(bookObject);
// Difference between unknown and any:
let value;
value = "chai";
value = [1, 3, 4, 5];
value = 3.9;
value.toUpperCase();
let anotherValue;
anotherValue = "chai";
anotherValue = [1, 3, 4, 5];
anotherValue = 3.9;
// anotherValue.toUpperCase();
if (typeof anotherValue === "string") {
    anotherValue.toUpperCase();
}
// try catch precaution
try {
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    console.log("Error", error);
}
// Unknown response data :
const data = "chai aur code";
const strData = data;
function redirectBasedOnRole(role) {
    if (role === "admin") {
        console.log("Redirect to admin dashboard");
        return;
    }
    if (role === "user") {
        console.log("Redirect to user dashboard");
        return;
    }
    role;
}
//# sourceMappingURL=04moreTypesinTs.js.map