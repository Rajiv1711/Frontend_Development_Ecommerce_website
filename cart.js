document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutButton = document.querySelector('.checkout');

    // Fetch cart items from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td><input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to update cart in local storage
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Event listener for quantity input changes
    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const id = e.target.getAttribute('data-id');
            const quantity = parseInt(e.target.value);
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                updateCart();
                renderCartItems();
            }
        }
    });

    // Event listener for remove button clicks
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
            renderCartItems();
        }
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
        alert('Proceed to checkout');
        // Here you can redirect to the checkout page or handle the checkout process
    });

    // Initial render of cart items
    renderCartItems();
});