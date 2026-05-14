const initialProducts = [
    {
        id: 1,
        name: "Asus VivoBook Laptop",
        category: "Electronics",
        price: 25000000,
        stock: 12,
        rating: 4.5,
        status: "In Stock"
    },
    {
        id: 2,
        name: "Sony Wireless Headphones",
        category: "Accessories",
        price: 4500000,
        stock: 0,
        rating: 4.2,
        status: "Out of Stock"
    },
    {
        id: 3,
        name: "Logitech Gaming Mouse",
        category: "Accessories",
        price: 1800000,
        stock: 25,
        rating: 4.8,
        status: "In Stock"
    }
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price) + ' Toman';
};
const editIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
`;

const deleteIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
`;

const renderProductRow = (product) => {
    let statusClass = '';
    let statusText = product.status;

    if (product.stock > 0) {
        statusClass = 'bg-green-100 text-green-800';
        statusText = 'In Stock';
    } else if (product.stock === 0) {
        statusClass = 'bg-red-100 text-red-800';
        statusText = 'Out of Stock';
    } else {
        statusClass = 'bg-yellow-100 text-yellow-800';
        statusText = 'Low Stock';
    }

    return `
    <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <div class="flex items-center">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-3">
                    ${product.name.charAt(0)}
                </div>
                <div class="mr-3">
                    <p class="text-gray-900 whitespace-no-wrap font-semibold">${product.name}</p>
                    <p class="text-gray-500 text-xs">#${product.id}</p>
                </div>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span class="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                <span aria-hidden class="absolute inset-0 bg-gray-200 opacity-25 rounded-md"></span>
                <span class="relative">${product.category}</span>
            </span>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <p class="text-gray-900 whitespace-no-wrap font-medium">${formatPrice(product.price)}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <div class="flex items-center justify-start gap-2">
                <span class="font-bold text-gray-800">${product.stock}</span>
                <span class="text-xs text-gray-500">pcs</span>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span class="inline-block px-2 py-1 text-xs font-semibold leading-tight rounded-full ${statusClass}">
                ${statusText}
            </span>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <div class="flex items-center justify-start gap-2">
                <button class="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50 edit-btn" data-id="${product.id}" title="Edit">
                    ${editIconSVG}
                </button>
                <button class="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50 delete-btn" data-id="${product.id}" title="Delete">
                    ${deleteIconSVG}
                </button>
            </div>
        </td>
    </tr>
    `;
};

const ProductsPage = () => {
    let products = JSON.parse(localStorage.getItem('dashboard_products'));
    if (!products || products.length === 0) {
        products = initialProducts;
        localStorage.setItem('dashboard_products', JSON.stringify(products));
    }
    const totalProducts = products.length;
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const productRows = products.map(renderProductRow).join('');

    return `
        <div dir="ltr" class="flex h-screen bg-gray-100 font-sans">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <div class="mb-6 flex justify-between items-center">
                    <div class="max-w-2xl">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Product Management</h1>
        <p class="text-gray-500 mt-2 text-lg">
            Check and manage inventory stock and prices
        </p>
    </div>
                    <button id="AddProduct" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors flex items-center gap-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Product
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow p-5 border-r-4 border-indigo-500">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-2">
                                <i class="fa-solid fa-box-open text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
  <line x1="12" y1="22.08" x2="12" y2="12"></line>
</svg></i>
                            </div>
                            <div class="mr-4">
                                <p class="text-sm font-medium text-gray-500">Total Products</p>
                                <p class="text-2xl font-bold text-gray-800">${totalProducts}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-5 border-r-4 border-yellow-500">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-2">
                                <i class="fa-solid fa-triangle-exclamation text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
  <line x1="12" y1="9" x2="12" y2="13"></line>
  <line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg></i>
                            </div>
                            <div class="mr-4">
                                <p class="text-sm font-medium text-gray-500">Low Stock</p>
                                <p class="text-2xl font-bold text-gray-800">${lowStockCount}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow p-5 border-r-4 border-green-500">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-green-100 text-green-500 mr-2">
                                <i class="fa-solid fa-sack-dollar text-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
  <path d="M12 18V6"></path>
</svg>
</i>
                            </div>
                            <div class="mr-4">
                                <p class="text-sm font-medium text-gray-500">Total Inventory Value</p>
                                <p class="text-xl font-bold text-gray-800">${formatPrice(totalValue)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow overflow-x-hidden">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800">Product List</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="productsTableBody">
                                ${productRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <div id="AddProductModal" class="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50 hidden">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-x-hidden border-t-4 border-indigo-500">
                    <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h2 class="text-xl font-bold text-gray-800">
                            <span class="text-indigo-600">+</span>
                            <span id="modalTitle">Add New Product</span>
                        </h2>
                        <button id="closeModal" class="text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 p-1 rounded-full transition-colors duration-200 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-8">
                        <form id="productForm" class="space-y-6">
                            <input type="hidden" id="productId">
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">Product Name</label>
                                    <input type="text" name="productName" id="inputProductName" placeholder="e.g., iPhone 13" required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">Category</label>
                                    <select name="category" id="inputCategory"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Home Appliances">Home Appliances</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">Price (Toman)</label>
                                    <input type="number" name="price" id="inputPrice" placeholder="0" required min="0"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">Stock</label>
                                    <input type="number" name="stock" id="inputStock" placeholder="0" required min="0"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">Rating (1-5)</label>
                                    <input type="number" name="rating" id="inputRating" placeholder="4.5" required min="1" max="5" step="0.1"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                                </div>
                            </div>
                            <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                                <button type="button" id="cancelProductBtn"
                                    class="px-6 py-2.5 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium">
                                    Cancel
                                </button>
                                <button type="submit" id="saveProductBtn"
                                    class="px-6 py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all font-medium transform active:scale-95">
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export default ProductsPage;