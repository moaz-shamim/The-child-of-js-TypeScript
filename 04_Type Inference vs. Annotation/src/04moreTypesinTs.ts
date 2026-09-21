let response: any = "42";
// Type Asertion
let numericLength: number = (response as string).length;

type Book = {
	name: string;
};

let bookString = `{"name":"who move my cheese"}`;
let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject);

// Difference between unknown and any:
let value: any;
value = "chai";
value = [1, 3, 4, 5];
value = 3.9;
value.toUpperCase();

let anotherValue: unknown;
anotherValue = "chai";
anotherValue = [1, 3, 4, 5];
anotherValue = 3.9;
// anotherValue.toUpperCase();

if (typeof anotherValue === "string") {
	anotherValue.toUpperCase();
}

// try catch precaution
try {
} catch (error) {
	if (error instanceof Error) {
		console.log(error.message);
	}
	console.log("Error", error);
}

// Unknown response data :
const data: unknown = "chai aur code";
const strData: string = data as string;

// Never say never
type Role = "admin" | "user" | "superadmin";

function redirectBasedOnRole(role: Role): void {
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
