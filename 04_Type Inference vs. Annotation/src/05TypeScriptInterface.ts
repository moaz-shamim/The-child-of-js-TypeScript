// Avoid repeating the same object structure multiple times:
type chaiOrder = {
	type: string;
	sugar: number;
	strong: boolean;
};

function makeChai(order: chaiOrder) {
	console.log("order");
}
function serveChai(order: chaiOrder) {
	console.log("order");
}

// implements
type TeaReceipe = {
	water: number;
	milk: number;
};

class MasalaChai implements TeaReceipe {
	water = 100;
	milk = 50;
}

// different type not work with class

// type CupSize = "small" | "large";
interface CupSize {
	size: "small" | "large";
}

class Chai implements CupSize {
	size: "small" | "large" = "large";
}

// type Response = { ok: true } | { ok: true };

// class myRes implements Response {
// 	ok: boolean = true;
// }

// Union
type TeaType = "masala" | "ginger" | "lemon";

function orderChai(t: TeaType) {
	console.log(t);
}

// Intersection
type BaseChai = { teaLeaves: number };
type Extra = { masala: number };

type NewMasalaChai = BaseChai & Extra;

const cup: NewMasalaChai = {
	teaLeaves: 10,
	masala: 10,
};

// optional type
type User = {
	username: string;
	bio?: string;
};

const u1: User = { username: "Hitesh" };
const u2: User = { username: "Hitesh", bio: "hitesh.ai" };

// read only
type Config = {
	readonly appName: string;
	version: number;
};

const cfg: Config = {
	appName: "MasterJi",
	version: 1,
};

// We can't modify this bcs this is read only. 
// cfg.appName = "chaiOrCode";
