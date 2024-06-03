document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsElement = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            addProductToCart(productId);
        });
    });

    function addProductToCart(productId) {
        const productElement = document.querySelector(`.product[data-id="${productId}"]`);
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        const productInCart = cart.find(item => item.id === productId);

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
            cartItemsElement.appendChild(li);
            total += item.price * item.quantity;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            addProductToCart(productId);
        });
    });

    function addProductToCart(productId) {
        const productElement = document.querySelector(`.product[data-id="${productId}"]`);
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        const productInCart = cart.find(item => item.id === productId);

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
