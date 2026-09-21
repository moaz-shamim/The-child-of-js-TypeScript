let drink = "chai";

let cups = Math.random() > 0.5 ? 10 : "moaz";



function serveChai(msg?: string) {
	if (msg) {
		return `Serving ${msg}`;
	}

	return `Serving Default Masala chai`;
}
