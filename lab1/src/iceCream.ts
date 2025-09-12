function countIceCreamPrice(): number {
    let iceCreamPrice: number = 0;

    const  waffleCupSize: string = prompt(
        "Chose your Waffle Cup Size:\n" +
        "1 – Small Waffle Cup – 10 hrn\n" +
        "2 – Large Waffle Cup – 25 hrn"
    ) || "";
    if (waffleCupSize === "1") {
        iceCreamPrice += 10;
    } else if (waffleCupSize === "2") {
        iceCreamPrice += 25;
    } else {
        window.location.reload();
    }

    const rawFlavour: string = prompt(
        "Choose your ice cream toppings (at least one):\n" +
        "1 – Chocolate (+5 грн)\n" +
        "2 – Caramel (+6 грн)\n" +
        "3 – Berries (+10 грн)\n\n" +
        "Input example: '1 2 3'"
    ) || "";

    if (!rawFlavour) {
        window.location.reload();
    }

    const flavourList: string[] = rawFlavour.split(" ");
    for (let i = 0; i < flavourList.length; i++) {
        if (flavourList[i] === "1") {
            iceCreamPrice += 5;
        } else if (flavourList[i] === "2") {
            iceCreamPrice += 6;
        } else if (flavourList[i] === "3") {
            iceCreamPrice += 10;
        }
    }

    const addMarshmallow: string = prompt(
        "Optional extra topping:\n" +
        "1 – Marshmallow (+5 грн)\n" +
        "Leave blank for refuse."
    ) || "";

    if (addMarshmallow === "1") {
        iceCreamPrice += 5;
    }

    return iceCreamPrice;
}

console.log(`It will be ${countIceCreamPrice()} hrn for the ice cream`)