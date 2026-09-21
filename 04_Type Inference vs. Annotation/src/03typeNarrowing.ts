function getChai(kind: string | number) {
	if (typeof kind === "string") {
		return `Making ${kind} chai...`;
	}

	return `Chai oder: ${kind}`;
}

function serveChai(msg?: string) {
	if (msg) {
		return `Serving ${msg}`;
	}

	return `Serving Default Massala Chai`;
}

let myImpossibleValue: never;

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

function serve(chai: KulhadChai | Cutting) {
	if (chai instanceof KulhadChai) {
		return chai.serve();
	}
}

const chai = new KulhadChai();


console.log(serve(chai));


// type keyword in TypeScript:

type masalaChai = { flavour: "Masala"; spiceLevel: number };
type gingerChai = { flavour: "Ginger"; amount: number };
type elaichiChai = { flavour: "Elaichi"; aroma: number };

type Chai = masalaChai | gingerChai | elaichiChai;

function MakeChai(order: Chai) {
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
function brew(order: masalaChai | gingerChai | elaichiChai) {
	if ("spiceLevel" in order) {
		// do something
	}
}
