let airlineSeat: "aisle" | "window" | "middle" = "window";

const orders = ["10", "20", "30", "40", "50"];

let currentOrder: string | undefined;

for (let order of orders) {
	if (order === "28") {
		currentOrder = order;
		break;
	}
}

// currentOrder = "popo";

console.log(currentOrder);