// DOM elements
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const adminPassword = document.getElementById('admin-password');
const productForm = document.getElementById('product-form');
const productId = document.getElementById('product-id');
const productName = document.getElementById('product-name');
const productCategory = document.getElementById('product-category');
const productPrice = document.getElementById('product-price');
const productImage = document.getElementById('product-image');
const productDescription = document.getElementById('product-description');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const productsContainer = document.getElementById('products-container');
const logoutBtn = document.getElementById('logout-btn');

// Admin password (in a real application, this should be stored securely on the server)
const ADMIN_PASSWORD = 'admin123';

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

    if (isLoggedIn) {
        loginModal.style.display = 'none';
        loadProducts();
    } else {
        loginModal.style.display = 'block';
    }
}

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (adminPassword.value === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        loginModal.style.display = 'none';
        loadProducts();
        showNotification('Login successful!');
    } else {
        showNotification('Incorrect password. Please try again.');
        adminPassword.value = '';
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.setItem('adminLoggedIn', 'false');
    location.reload();
});

// Load products from localStorage
function loadProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // If no products in localStorage, use default products
    if (products.length === 0) {
        products = [
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

        localStorage.setItem('products', JSON.stringify(products));
    }

    renderProducts(products);
}

// Render products in admin panel
function renderProducts(products) {
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-item-image">
            <div class="product-item-info">
                <div class="product-item-name">${product.name}</div>
                <div class="product-item-category">${getCategoryName(product.category)}</div>
                <div class="product-item-price">$${product.price}</div>
            </div>
            <div class="product-item-actions">
                <button class="btn-edit" data-id="${product.id}">Edit</button>
                <button class="btn-delete" data-id="${product.id}">Delete</button>
            </div>
        `;
        productsContainer.appendChild(productItem);
    });

    // Add event listeners to edit and delete buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            editProduct(productId);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'phones': 'Used Phones',
        'screens': 'Screens',
        'cameras': 'Cameras',
        'batteries': 'Batteries',
        'resistors': 'Resistors',
        'capacitors': 'Capacitors',
        'coils': 'Coils',
        'other': 'Other Parts'
    };

    return categoryNames[category] || category;
}

// Add or update product
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const isEditing = productId.value !== '';

    if (isEditing) {
        // Update existing product
        const index = products.findIndex(p => p.id === parseInt(productId.value));

        if (index !== -1) {
            products[index] = {
                id: parseInt(productId.value),
                name: productName.value,
                category: productCategory.value,
                price: parseFloat(productPrice.value),
                image: productImage.value || `https://picsum.photos/seed/${productName.value.replace(/\s+/g, '').toLowerCase()}/400/300.jpg`,
                description: productDescription.value
            };

            showNotification('Product updated successfully!');
        }
    } else {
        // Add new product
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name: productName.value,
            category: productCategory.value,
            price: parseFloat(productPrice.value),
            image: productImage.value || `https://picsum.photos/seed/${productName.value.replace(/\s+/g, '').toLowerCase()}/400/300.jpg`,
            description: productDescription.value
        };

        products.push(newProduct);
        showNotification('Product added successfully!');
    }

    localStorage.setItem('products', JSON.stringify(products));
    renderProducts(products);
    resetForm();
});

// Edit product
function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === id);

    if (product) {
        productId.value = product.id;
        productName.value = product.name;
        productCategory.value = product.category;
        productPrice.value = product.price;
        productImage.value = product.image;
        productDescription.value = product.description;

        formTitle.textContent = 'Edit Product';
        submitBtn.textContent = 'Update Product';
        cancelBtn.style.display = 'inline-block';

        // Scroll to form
        productForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const filteredProducts = products.filter(p => p.id !== id);

        localStorage.setItem('products', JSON.stringify(filteredProducts));
        renderProducts(filteredProducts);

        showNotification('Product deleted successfully!');
    }
}

// Reset form
function resetForm() {
    productForm.reset();
    productId.value = '';
    formTitle.textContent = 'Add New Product';
    submitBtn.textContent = 'Add Product';
    cancelBtn.style.display = 'none';
}

// Cancel button
cancelBtn.addEventListener('click', resetForm);

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

// Initialize admin panel
document.addEventListener('DOMContentLoaded', checkLoginStatus);