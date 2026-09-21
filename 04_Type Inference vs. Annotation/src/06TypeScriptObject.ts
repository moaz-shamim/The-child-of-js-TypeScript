const chai = {
    name: "Masala chai",
    price: 20,
    isHot: true
}

// {
//     name: string;
//     price: number;
//     isHot: boolean
// }




// Inline object type

let product: {
    title: string;
    price: number;
    inStock: boolean;
};

product = {
    title: "Laptop",
    price: 50000,
    inStock: true
};



type Cup = {
    size : string
}

let smallCup: Cup = {
    size : "200ml"
}

let bigCup = {
    size : "500ml",
    material :"steel"
}

smallCup = bigCup; 

// console.log("smallCup",smallCup.size)
// console.log("smallCup",smallCup.material)
// console.log("bigCup",bigCup)



// type Cup = { size: string };

// let wrongCup = {
//     material: "steel"
// };

// smallCup = wrongCup;



// Split data type:

