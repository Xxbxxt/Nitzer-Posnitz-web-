// Sample inventory data
const inventory = [
    {
        id: 'E001',
        name: 'Laptop Pro X',
        category: 'electronics',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD',
        // image: '/api/placeholder/300/200',
        stock: 15
    },
    {
        id: 'F001',
        name: 'Office Chair',
        category: 'furniture',
        description: 'Ergonomic office chair with lumbar support',
        // image: '/api/placeholder/300/200',
        stock: 8
    },
    {
        id: 'C001',
        name: 'Cotton T-Shirt',
        category: 'clothing',
        description: 'Premium cotton t-shirt available in multiple colors',
        // image: '/api/placeholder/300/200',
        stock: 45
    },
    {
        id: 'B001',
        name: 'Programming Guide',
        category: 'books',
        description: 'Comprehensive guide to modern programming',
        // image: '/api/placeholder/300/200',
        stock: 3
    },
    // Add more items as needed
];

// DOM elements
const searchInput = document.getElementById('searchInput');
const tabContainer = document.getElementById('tabContainer');
const statsContainer = document.getElementById('statsContainer');
const productsGrid = document.getElementById('productsGrid');

// Current filter state
let currentCategory = 'all';
let searchQuery = '';

// Update stats
function updateStats(filteredProducts) {
    const stats = {};
    inventory.forEach(product => {
        stats[product.category] = (stats[product.category] || 0) + product.stock;
    });

    statsContainer.innerHTML = Object.entries(stats).map(([category, count]) => `
        <div class="stat-card">
            <div class="stat-value">${count}</div>
            <div class="stat-label">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    return inventory.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

// Render products
function renderProducts() {
    const filteredProducts = filterProducts();
    updateStats(filteredProducts);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-id">${product.id}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="stock-status ${getStockStatusClass(product.stock)}">
                    ${getStockStatusText(product.stock)}
                </div>
            </div>
        </div>
    `).join('');
}

function getStockStatusClass(stock) {
    if (stock === 0) return 'out-of-stock';
    if (stock < 5) return 'low-stock';
    return 'in-stock';
}

function getStockStatusText(stock) {
    if (stock === 0) return 'Out of Stock';
    if (stock < 5) return `Low Stock: ${stock} left`;
    return `In Stock: ${stock} units`;
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

tabContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab')) {
        document.querySelector('.tab.active').classList.remove('active');
        e.target.classList.add('active');
        currentCategory = e.target.dataset.category;
        renderProducts();
    }
});

// Initial render
renderProducts();