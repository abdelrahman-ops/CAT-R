async function productPrice(productId) {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();
    return product.price;
}

async function calcTotalPrice() {
    const products = [
        { id: 1, quantity: 3 },
        { id: 4, quantity: 4 },
        { id: 3, quantity: 5 },
    ];

    let totalPrice = 0;

    for (const product of products) {
        const price = await productPrice(product.id);
        totalPrice += price * product.quantity;
    }

    console.log(`The total price of the products is: $${totalPrice.toFixed(2)}`);
}

calcTotalPrice();
