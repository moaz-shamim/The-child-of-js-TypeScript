// class Chai {
// 	flavour: string;
// 	price: number;

// 	constructor(flavour: string, price: number) {
// 		this.flavour = flavour;
// 		this.price = price;
// 	}
// }

// const masalaChai = new Chai("Masala", 20);

// console.log("masalaChai", masalaChai);

// Class Shorthand:
// class Chaia {
// 	constructor(
// 		public flavour: string,
// 		public price: number,
// 	) {}
// }

// const masalaChai = new Chaia("Pan", 10);
// console.log("masalaChai", masalaChai);

// Describing Cost:
// class Chaia {
// 	constructor(
// 		public flavour: string,
// 		public price: number,
// 	) {}

// 	describe() {
// 		return `${this.flavour} chai costs ₹${this.price}`;
// 	}
// }

// const masalaChai = new Chaia("Pan", 10);
// console.log(masalaChai.describe());

// Access Modifiers:
// class Chaia {
// 	constructor(
// 		public flavour: string,
// 		private secretRecipe: string,
// 	) {}
// }

// const masalaChai = new Chaia("Pan", "PanBahar");
// console.log(masalaChai.secretRecipe);

// TypeScript's private is only checked at compile time. It is not true runtime privacy (unless you use JavaScript's # private fields).

// class Chaia {
//   #secretRecipe: string;

//   constructor(
//     public flavour: string,
//     secretRecipe: string
//   ) {
//     this.#secretRecipe = secretRecipe;
//   }
// }

// const masalaChai = new Chaia("Pan", "PanBahar");

// // ❌ SyntaxError / compile error
// console.log(masalaChai.#secretRecipe);

// Property '#secretRecipe' is not accessible outside class 'Chaia' because it has a private identifier.

// Inheritance:
// class Chai {
// 	constructor(public flavour: string) {}
// }

// class SpecialChai extends Chai {
// 	constructor(
// 		flavour: string,
// 		public toppings: string[],
// 	) {
// 		super(flavour);
// 	}
// }

// const specialChai = new SpecialChai("Tulsi", ["Tulsi", "Honey"]);
// console.log("specialChai", specialChai);

// class Chai {
// 	constructor(protected price: number) {}
// }

// class SpecialChai extends Chai {
// 	showPrice() {
// 		return this.price;
// 	}
// }

// const specialTea = new SpecialChai(20);
// console.log(specialTea.showPrice());

class Chai {
	private _price = 0;

	get price() {
		return this._price;
	}

	set price(value: number) {
		this._price = value;
	}
}

const chai = new Chai();

chai.price = 20;
console.log("Chai Price", chai.price);
