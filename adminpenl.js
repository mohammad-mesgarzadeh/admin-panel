import DashboardPage from './pages/DashboardPage.js'
import ProductsPage from './pages/ProductsPage.js'
import ReportsPage from './pages/ReportsPage.js'
import SettingsPage from './pages/SettingsPage.js'
import UserPage from './pages/UsersPage.js'


if (!location.hash) {
    location.hash = '/'
}

const navTo = (url) => {
    location.hash = url
}

const router = () => {
    const routes = [
        { path: '/', view: DashboardPage },
        { path: '/UsersPage', view: UserPage },
        { path: '/ProductsPage', view: ProductsPage },
        { path: '/ReportsPage', view: ReportsPage },
        { path: '/SettingsPage', view: SettingsPage },
    ]

    const currentPath = location.hash.slice(1)
    const matchRoutes = routes.map((item) => {
        return {
            route: item,
            isMatch: currentPath === item.path,
        }
    })

    let match = matchRoutes.find(item => item.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        }
    }

    const app = document.querySelector('#app')

    if (app) {
        app.innerHTML = match.route.view()

        if (match.route.path === '/ReportsPage') {
            setTimeout(() => {
                drawChart()
            }, 100)
        }
    }

    initEventListeners()
}

window.addEventListener('hashchange', router)

function drawChart() {
    const canvas = document.getElementById('salesChart')

    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    if (rect.width === 0 || rect.height === 0) return

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, rect.width, rect.height)

    const data = [65, 59, 80, 81, 56, 95, 70, 85, 90, 60, 75, 88]

    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    const maxVal = Math.max(...data) * 1.1
    const minVal = 0

    const stepX = chartWidth / (data.length - 1)

    const getX = (index) => padding + index * stepX

    const getY = (value) => {
        return padding + chartHeight - ((value - minVal) / (maxVal - minVal)) * chartHeight
    }

    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight * i) / 4

        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(rect.width - padding, y)
        ctx.stroke()
    }

    const gradient = ctx.createLinearGradient(0, padding, 0, rect.height - padding)

    gradient.addColorStop(0, 'rgba(79,70,229,0.4)')
    gradient.addColorStop(1, 'rgba(79,70,229,0)')

    ctx.beginPath()
    ctx.moveTo(getX(0), getY(data[0]))

    for (let i = 1; i < data.length; i++) {
        ctx.lineTo(getX(i), getY(data[i]))
    }

    ctx.lineTo(getX(data.length - 1), rect.height - padding)
    ctx.lineTo(getX(0), rect.height - padding)
    ctx.closePath()

    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(getX(0), getY(data[0]))

    for (let i = 1; i < data.length; i++) {
        ctx.lineTo(getX(i), getY(data[i]))
    }

    ctx.strokeStyle = '#4f46e5'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#4f46e5'
    ctx.lineWidth = 2

    data.forEach((val, i) => {
        ctx.beginPath()
        ctx.arc(getX(i), getY(val), 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
    })
}

function initEventListeners() {

    document.body.onclick = (event) => {
        const link = event.target.closest('[data-link]')

        if (link) {
            event.preventDefault()
            navTo(link.getAttribute('href'))
        }
    }

    const currentPath = location.hash.slice(1)

    const navLinks = document.querySelectorAll('[data-link]')

    navLinks.forEach(link => {
        link.classList.remove('active')

        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active')
        }
    })

    // USERS

    const closeBtn = document.getElementById('close')
    const cancelBtn = document.getElementById('cancelBtn')
    const addNewUserModal = document.getElementById('AddNewUser')
    const addUserBtn = document.getElementById('AddUser')
    const form = document.getElementById('addUserForm')
    const searchInput = document.getElementById('searchInput')
    const modalTitle = document.getElementById('modalTitle')
    const saveBtn = document.getElementById('saveBtn')

    let editingUserName = null

    const closeModal = () => {
        if (addNewUserModal) addNewUserModal.classList.add('hidden')

        editingUserName = null

        if (form) form.reset()
        if (modalTitle) modalTitle.innerText = 'Add new user'
        if (saveBtn) saveBtn.innerText = 'Save User'
    }

    if (closeBtn) closeBtn.onclick = closeModal

    if (cancelBtn) cancelBtn.onclick = closeModal

    if (addNewUserModal) {
        addNewUserModal.onclick = (e) => {
            if (e.target === addNewUserModal) closeModal()
        }
    }

    if (addUserBtn && addNewUserModal) {
        addUserBtn.onclick = () => {
            closeModal()
            addNewUserModal.classList.remove('hidden')
        }
    }

    // Search
    if (searchInput) {
        searchInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                localStorage.setItem('active_search', searchInput.value)
                router()
            }
        }
    }

    // Users Table
    const tbody = document.getElementById('usersTableBody')

    if (tbody) {
        tbody.onclick = (e) => {
            const target = e.target.closest('button')

            if (!target) return

            const userName = target.getAttribute('data-name')

            // Delete
            if (target.classList.contains('delete-btn')) {

                if (confirm(`Are you sure you want to delete ${userName}?`)) {

                    let users = JSON.parse(localStorage.getItem('dashboard_users')) || []

                    users = users.filter(u => u.name !== userName)

                    localStorage.setItem('dashboard_users', JSON.stringify(users))

                    router()
                }
            }

            // Edit
            else if (target.classList.contains('edit-btn')) {

                let users = JSON.parse(localStorage.getItem('dashboard_users')) || []

                const userToEdit = users.find(u => u.name === userName)

                if (userToEdit) {

                    editingUserName = userName

                    document.getElementById('inputUsername').value = userToEdit.name
                    document.getElementById('inputEmail').value = userToEdit.email
                    document.getElementById('inputRole').value = userToEdit.role
                    document.getElementById('inputStatus').value = userToEdit.status

                    modalTitle.innerText = 'Edit User'
                    saveBtn.innerText = 'Update User'

                    addNewUserModal.classList.remove('hidden')
                }
            }
        }
    }

    // Save User
    if (form) {

        form.onsubmit = (e) => {

            e.preventDefault()

            const formData = new FormData(form)

            let users = JSON.parse(localStorage.getItem('dashboard_users')) || []

            if (editingUserName) {

                const index = users.findIndex(u => u.name === editingUserName)

                if (index !== -1) {

                    users[index].name = formData.get('username')
                    users[index].email = formData.get('email')
                    users[index].role = formData.get('role')
                    users[index].status = formData.get('status')
                }

            } else {

                users.push({
                    name: formData.get('username'),
                    email: formData.get('email'),
                    role: formData.get('role'),
                    status: formData.get('status'),
                })
            }

            localStorage.setItem('dashboard_users', JSON.stringify(users))

            closeModal()

            router()
        }
    }

    //  PRODUCTS

    const addProductBtn = document.getElementById('AddProduct')
    const productModal = document.getElementById('AddProductModal')
    const closeProductModalBtn = document.getElementById('closeModal')
    const cancelProductBtn = document.getElementById('cancelProductBtn')
    const productForm = document.getElementById('productForm')
    const productModalTitle = document.getElementById('modalTitle')
    const saveProductBtn = document.getElementById('saveProductBtn')

    let editingProductId = null

    const closeProductModal = () => {

        if (productModal) productModal.classList.add('hidden')

        editingProductId = null

        if (productForm) productForm.reset()
        if (productModalTitle) {
            productModalTitle.innerText = 'Add New Product'
        }

        if (saveProductBtn) {
            saveProductBtn.innerText = 'Save Product'
        }
    }

    if (closeProductModalBtn) {
        closeProductModalBtn.onclick = closeProductModal
    }

    if (cancelProductBtn) {
        cancelProductBtn.onclick = closeProductModal
    }

    if (productModal) {
        productModal.onclick = (e) => {
            if (e.target === productModal) {
                closeProductModal()
            }
        }
    }

    if (addProductBtn && productModal) {
        addProductBtn.onclick = () => {
            closeProductModal()
            productModal.classList.remove('hidden')
        }
    }

    // Products Table
    const productsTableBody = document.getElementById('productsTableBody')

    if (productsTableBody) {

        productsTableBody.onclick = (e) => {

            const target = e.target.closest('button')

            if (!target) return

            const productId = target.getAttribute('data-id')

            // Delete Product
            if (target.classList.contains('delete-btn')) {

                if (confirm('Are you sure you want to delete this product?')) {

                    let products = JSON.parse(localStorage.getItem('dashboard_products')) || []

                    products = products.filter(p => p.id != productId)

                    localStorage.setItem('dashboard_products', JSON.stringify(products))

                    router()
                }
            }

            // Edit Product
            else if (target.classList.contains('edit-btn')) {

                let products = JSON.parse(localStorage.getItem('dashboard_products')) || []

                const productToEdit = products.find(p => p.id == productId)

                if (productToEdit) {

                    editingProductId = productId

                    document.getElementById('inputProductName').value = productToEdit.name
                    document.getElementById('inputCategory').value = productToEdit.category
                    document.getElementById('inputPrice').value = productToEdit.price
                    document.getElementById('inputStock').value = productToEdit.stock
                    document.getElementById('inputRating').value = productToEdit.rating

                    productModalTitle.innerText = 'Edit Product'
                    saveProductBtn.innerText = 'Update Product'

                    productModal.classList.remove('hidden')
                }
            }
        }
    }

    // Save Product
    if (productForm) {

        productForm.onsubmit = (e) => {

            e.preventDefault()

            const formData = new FormData(productForm)

            let products = JSON.parse(localStorage.getItem('dashboard_products')) || []

            if (editingProductId) {

                const index = products.findIndex(p => p.id == editingProductId)

                if (index !== -1) {

                    products[index].name = formData.get('productName')
                    products[index].category = formData.get('category')
                    products[index].price = Number(formData.get('price'))
                    products[index].stock = Number(formData.get('stock'))
                    products[index].rating = Number(formData.get('rating'))
                    products[index].status =
                        Number(formData.get('stock')) > 0
                            ? 'In Stock'
                            : 'Out of Stock'
                }

            } else {

                const newId =
                    products.length > 0
                        ? Math.max(...products.map(p => p.id)) + 1
                        : 1

                products.push({
                    id: newId,
                    name: formData.get('productName'),
                    category: formData.get('category'),
                    price: Number(formData.get('price')),
                    stock: Number(formData.get('stock')),
                    rating: Number(formData.get('rating')),
                    status:
                        Number(formData.get('stock')) > 0
                            ? 'In Stock'
                            : 'Out of Stock',
                })
            }

            localStorage.setItem('dashboard_products', JSON.stringify(products))

            closeProductModal()

            router()
        }
    }
}

// Start App
document.addEventListener('DOMContentLoaded', () => {

    router()

    window.addEventListener('resize', drawChart)
})