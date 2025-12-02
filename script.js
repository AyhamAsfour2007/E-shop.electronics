// Load products from localStorage
function loadProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // If no products in localStorage, use default products
    if (products.length === 0) {
        const defaultProducts = [
            {
                id: 1,
                name: "iPhone X",
                category: "phones",
                price: 299,
                image: "https://picsum.photos/seed/iphonex/400/300.jpg",
                description: "Good condition iPhone X with 64GB storage"
            },
            {
                id: 2,
                name: "Samsung Galaxy S10",
                category: "phones",
                price: 249,
                image: "https://picsum.photos/seed/galaxys10/400/300.jpg",
                description: "Samsung Galaxy S10 in excellent condition"
            },
            {
                id: 3,
                name: "iPhone 11 Screen",
                category: "screens",
                price: 79,
                image: "https://picsum.photos/seed/iphone11screen/400/300.jpg",
                description: "Original iPhone 11 replacement screen"
            },
            {
                id: 4,
                name: "Samsung S10 Screen",
                category: "screens",
                price: 89,
                image: "https://picsum.photos/seed/s10screen/400/300.jpg",
                description: "High quality Samsung S10 replacement screen"
            },
            {
                id: 5,
                name: "iPhone X Camera",
                category: "cameras",
                price: 45,
                image: "https://picsum.photos/seed/iphonexcamera/400/300.jpg",
                description: "Rear camera module for iPhone X"
            },
            {
                id: 6,
                name: "Samsung S10 Battery",
                category: "batteries",
                price: 35,
                image: "https://picsum.photos/seed/s10battery/400/300.jpg",
                description: "High capacity battery for Samsung S10"
            },
            {
                id: 7,
                name: "iPhone X Battery",
                category: "batteries",
                price: 40,
                image: "https://picsum.photos/seed/iphonexbattery/400/300.jpg",
                description: "Original battery for iPhone X"
            },
            {
                id: 8,
                name: "Resistor Kit (100pcs)",
                category: "resistors",
                price: 12,
                image: "https://picsum.photos/seed/resistorkit/400/300.jpg",
                description: "Assorted resistor values kit (100 pieces)"
            },
            {
                id: 9,
                name: "Capacitor Kit (50pcs)",
                category: "capacitors",
                price: 15,
                image: "https://picsum.photos/seed/capacitorkit/400/300.jpg",
                description: "Assorted capacitor values kit (50 pieces)"
            },
            {
                id: 10,
                name: "Inductor Coil Set (20pcs)",
                category: "coils",
                price: 18,
                image: "https://picsum.photos/seed/coilset/400/300.jpg",
                description: "Various inductor coils for phone repair (20 pieces)"
            },
            {
                id: 11,
                name: "Phone Repair Tool Kit",
                category: "other",
                price: 25,
                image: "https://picsum.photos/seed/toolkit/400/300.jpg",
                description: "Complete tool kit for phone repair"
            },
            {
                id: 12,
                name: "iPhone Charging Port",
                category: "other",
                price: 20,
                image: "https://picsum.photos/seed/chargingport/400/300.jpg",
                description: "Replacement charging port for iPhone X/XS"
            }
        ];

        localStorage.setItem('products', JSON.stringify(defaultProducts));
        return defaultProducts;
    }

    return products;
}

// Update the script.js file to use localStorage instead of hardcoded products
// Replace the existing script.js with this updated version

// Shopping cart
let cart = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const closeBtn = document.querySelector('.close-btn');
const cartIcon = document.querySelector('.cart-icon');
const categoryElements = document.querySelectorAll('.category');

// Load products from localStorage
let products = loadProductsFromStorage();

// Initialize the app
function init() {
    renderProducts(products);
    setupEventListeners();
}

// Render products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productElement);
    });

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Cart icon click
    cartIcon.addEventListener('click', () => {
        renderCart();
        cartModal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        checkout();
    });

    // Category filters
    categoryElements.forEach(category => {
        category.addEventListener('click', () => {
            const categoryType = category.getAttribute('data-category');
            filterProducts(categoryType);
        });
    });
}

// Filter products by category
function filterProducts(category) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);

    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();

    // Show notification
    showNotification(`${product.name} added to cart`);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Render cart
function renderCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotalPrice.textContent = '0';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    cartTotalPrice.textContent = total.toFixed(2);

    // Add event listeners to cart item buttons
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.remove-item');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            decreaseQuantity(productId);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            increaseQuantity(productId);
        });
    });

    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const productId = parseInt(input.getAttribute('data-id'));
            const newQuantity = parseInt(input.value);
            updateQuantity(productId, newQuantity);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);

    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartCount();
        renderCart();
    }
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity++;
        updateCartCount();
        renderCart();
    }
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);

    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        updateCartCount();
        renderCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }

    const customerNotes = document.getElementById('customer-notes').value;

    // Build WhatsApp message
    let message = "Hello! I'd like to order the following items:\n\n";

    cart.forEach(item => {
        // ⭐ التغيير هنا: استبدال $ بـ ₪ في سعر الوحدة
        message += `${item.name} - Quantity: ${item.quantity} - Price: ₪${item.price} each\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // ⭐ التغيير هنا: استبدال $ بـ ₪ في المجموع الكلي
    message += `\nTotal: ₪${total.toFixed(2)}\n`;
    message += `\nPayment method: Cash on delivery\n`;

    if (customerNotes) {
        message += `\nAdditional notes: ${customerNotes}\n`;
    }

    message += "\nPlease confirm my order. Thank you!";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the message
    // ملاحظة: يُفضل تغيير '1234567890' إلى رقم واتساب الصحيح (مثل 0598000890 من ملف index.html)
    window.open(`https://wa.me/970598000890?text=${encodedMessage}`, '_blank');

    // Clear cart after checkout
    cart = [];
    updateCartCount();
    cartModal.style.display = 'none';

    showNotification('Your order has been sent via WhatsApp!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);